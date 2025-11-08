import { useParams } from "react-router-dom";
import { PageTitle } from "../hooks/PageTitle";
import { useClasses } from "../contexts/ClassesContext";
import { IconButton } from "../components/Button";
import { LeftArrow } from "../components/svgs/classes";
import { D6, D8, D10, D12 } from "../components/svgs/dices";
import { useScrollTo } from "../hooks/useScrollTo";
import InfoTable from "../components/InfoTable";
import TraitsTable from "../components/TraitsTable";
import { Subclass } from "../components/svgs/Subclass";
import { PiPlusCircleBold } from "react-icons/pi";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

export default function ClassPage() {
  const { id } = useParams<{ id: string }>();
  PageTitle(id || "not found");
  const { classes } = useClasses();
  const selectedClass = classes.find((cls) => cls.id === id);
  const { scrollTo } = useScrollTo(64);
  const [classData, setClassData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadClassData = async () => {
      try {
        setLoading(true);
        const classDataModule = await import(`../configs/${id}.json`);
        setClassData(classDataModule.default);
      } catch (error) {
        console.error(
          `No se encontró el archivo de datos para la clase ${id}:`,
          error
        );
        setClassData({
          info_table: [],
          progresion_por_nivel: [],
          subclases: [],
          descripcion: `No se encontraron datos específicos para la clase ${
            selectedClass?.name || id
          }.`,
        });
      } finally {
        setLoading(false);
      }
    };

    loadClassData();
  }, [id]);

  if (!selectedClass) {
    PageTitle("not found");
    return (
      <div className="container mx-auto p-4">
        <h1>Clase no encontrada</h1>
      </div>
    );
  }

  if (loading || !classData) {
    return (
      <div className="container mx-auto p-4">
        <h1>Cargando información de la clase...</h1>
      </div>
    );
  }

  {
    /*Información tabla básicos */
  }
  const infoTableData = classData.info_table
    ? classData.info_table.map((item: any) => {
        if (item.type === "dice") {
          let DiceComponent;
          switch (item.dice_type) {
            case "D6":
              DiceComponent = D6;
              break;
            case "D8":
              DiceComponent = D8;
              break;
            case "D10":
              DiceComponent = D10;
              break;
            case "D12":
              DiceComponent = D12;
              break;
            default:
              DiceComponent = D6;
          }

          return {
            label: item.label,
            value: (
              <div className="flex items-center gap-2">
                <span className="text-red-secondary w-6 h-6 flex items-center justify-center">
                  <DiceComponent className="w-full h-full max-w-[16px] max-h-[16px] object-contain" />
                </span>
                <span>{item.value}</span>
              </div>
            ),
          };
        } else {
          return {
            label: item.label,
            value: item.value,
          };
        }
      })
    : [
        {
          label: "Error",
          value: "No se encuentra la información",
        },
      ];

  {
    /*Información tabla rasgos */
  }
  const traitsData = classData.progresion_por_nivel.map((nivel: any) => ({
    nivel: nivel.nivel,
    bonificador_por_competencia: nivel.bonificador_por_competencia,
    rasgos: nivel.rasgos.map((rasgo: any) => rasgo.nombre).join(", "),
    furias: nivel.furias?.usos_por_descanso || 0,
    daño_por_furia: nivel.furias?.daño_adicional || "",
    maestria_con_armas: nivel.maestria_con_armas,
  }));

  const traitsTitles = (type: string) => {
    switch (type) {
      case "Subclass":
        return <Subclass />;
      case "ASI":
        return <PiPlusCircleBold />;
      default:
        return null;
    }
  };

  const subclases = classData.subclases || [];

  return (
    <div className="w-full p-10 flex flex-col md:flex-row gap-10">
      <div
        id="content"
        className="flex flex-col gap-10 justify-center items-center"
      >
        <IconButton
          to="/dnd/classes"
          label="Volver atrás"
          classProp="absolute left-10 top-[104px]"
          icon={LeftArrow}
        />
        <h1 className="text-3xl font-inknut text-blue-dark">
          {selectedClass.name}
        </h1>
        <div className="flex flex-col gap-6">
          {selectedClass.description.map((paragraph, index) => (
            <p className="text-blue-primary whitespace-pre-line" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
        {
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col 2xl:flex-row gap-5">
              <div className="md:w-auto m-auto shrink-0">
                <InfoTable data={infoTableData} />
              </div>
              <div id="traits" className="flex flex-col">
                <h2 className="text-2xl font-inknut text-blue-dark">Rasgos</h2>
                <div className="flex flex-col mt-4">
                  {classData.progresion_por_nivel
                    .filter((nivel: any) => nivel.nivel === 1)
                    .map((nivel: any) => (
                      <div key={`nivel-${nivel.nivel}`}>
                        <h3 className="text-xl font-inknut text-red-secondary mt-4">
                          Nivel {nivel.nivel}
                        </h3>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                          {nivel.rasgos.map((rasgo: any, index: number) => (
                            <div
                              key={`trait-${nivel.nivel}-${index}`}
                              className="md:w-full"
                            >
                              <h4 className=" text-blue-primary font-inknut">
                                {rasgo.nombre}
                              </h4>
                              <div className="text-blue-primary text-justify">
                                <ReactMarkdown>
                                  {rasgo.descripcion}
                                </ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <TraitsTable
                data={traitsData}
                columns={[
                  {
                    key: "nivel",
                    header: "Nivel",
                  },
                  {
                    key: "bonificador_por_competencia",
                    header: "Bonificación por competencia",
                  },
                  {
                    key: "rasgos",
                    header: "Rasgos",
                  },
                  {
                    key: "furias",
                    header: "Furias",
                  },
                  {
                    key: "daño_por_furia",
                    header: "Daño por furia",
                  },
                  {
                    key: "maestria_con_armas",
                    header: "Maestría con armas",
                  },
                ]}
                className="w-full"
              />
            </div>
          </div>
        }

        {classData.progresion_por_nivel
          .filter((nivel: any) => nivel.nivel > 1)
          .map((nivel: any) => (
            <div
              key={`nivel-${nivel.nivel}`}
              className="w-full flex flex-col gap-5"
            >
              <h2 className="text-xl font-inknut text-red-secondary">
                Nivel {nivel.nivel}
              </h2>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {nivel.rasgos.map((rasgo: any, index: number) => (
                  <div
                    key={`trait-${nivel.nivel}-${index}`}
                    className={`flex flex-col gap-1 ${
                      nivel.rasgos.length === 1
                        ? "md:w-full"
                        : "md:w-[calc(50%-1rem)]"
                    }`}
                  >
                    <h3 className="text-blue-primary font-inknut flex gap-1 items-center">
                      {traitsTitles(rasgo.type || "")}
                      {}
                      {rasgo.nombre}
                    </h3>
                    <div className="text-blue-primary">
                      <ReactMarkdown>{rasgo.descripcion}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div className="flex flex-col gap-16 my-16">
          {subclases.map((subclase: any, index: number) => {
            const imagePath = new URL(
              `../assets/classes/${id}/${subclase.id}.jpg`,
              import.meta.url
            ).href;

            return (
              <div
                className="flex flex-col gap-4"
                id={`subclase-${index}`}
                key={`subclase-${index}`}
              >
                <h2 className="text-2xl font-inknut text-blue-dark">
                  {subclase.nombre}
                </h2>
                <div className=" text-blue-primary">
                  <ReactMarkdown>{subclase.descripcion}</ReactMarkdown>
                </div>
                <div className="flex flex-col lg:flex-row gap-4 float-left">
                  <img
                    src={imagePath}
                    className="w-full h-[400px] object-top lg:h-auto lg:w-[300px] object-cover rounded-sm"
                    alt={subclase.nombre}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex flex-col gap-8">
                    {subclase.progresion.map((progresion: any) => (
                      <div
                        key={`progression-${progresion.nivel}`}
                        className="w-full flex flex-col gap-2"
                      >
                        <h2 className="text-xl font-inknut text-red-secondary">
                          Nivel {progresion.nivel}
                        </h2>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4">
                          {progresion.rasgos.map((rasgo: any, idx: number) => (
                            <div
                              key={`trait-${progresion.nivel}-${idx}`}
                              className={`flex flex-col w-full  ${
                                progresion.rasgos.length === 1
                                  ? "xl:w-full"
                                  : "xl:w-[calc(50%-1rem)]"
                              }`}
                            >
                              <h3 className="text-blue-primary font-inknut flex gap-1 items-center">
                                {rasgo.nombre}
                              </h3>
                              <div className="text-blue-primary ">
                                <ReactMarkdown>
                                  {rasgo.descripcion}
                                </ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="indice"
        className="sticky top-26 self-start h-fit hidden lg:flex flex-col gap-10"
      >
        <div className="w-48 bg-dirty-white rounded-sm flex flex-col p-2.5 gap-2.5">
          <h2 className="text-red-secondary font-inknut text-center">Índice</h2>
          <a
            onClick={() => scrollTo(`#traits`)}
            className="font-inknut underline text-blue-primary text-sm hover:text-blue-500 hover:cursor-pointer rounded-sm p-1"
          >
            Rasgos
          </a>
          {subclases.map((subclase: any, index: number) => (
            <a
              key={`indice-subclase-${index}`}
              onClick={() => scrollTo(`#subclase-${index}`)}
              className="font-inknut underline text-blue-primary text-sm hover:text-blue-500 hover:cursor-pointer rounded-sm p-1"
            >
              {subclase.nombre}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
