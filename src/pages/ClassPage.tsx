import { useParams } from "react-router-dom";
import { PageTitle } from "../hooks/PageTitle";
import { useClasses } from "../contexts/ClassesContext";
import { IconButton } from "../components/Button";
import { LeftArrow } from "../components/svgs/classes";
import { D6, D8, D10, D12 } from "../components/svgs/dices";
import { useScrollTo } from "../hooks/useScrollTo";
import InfoTable from "../components/InfoTable";
import TraitsTable from "../components/TraitsTable";
import Card from "../components/Card";
import barbarianData from "../configs/barbarian.json";
import barbarianIndex from "../assets/classes/barbarian/barbarian-index.jpg";

export default function ClassPage() {
  PageTitle("clase");
  const { id } = useParams<{ id: string }>();
  const { classes } = useClasses();
  const selectedClass = classes.find((cls) => cls.id === id);
  const { scrollTo } = useScrollTo(64);

  if (!selectedClass) {
    return (
      <div className="container mx-auto p-4">
        <h1>Clase no encontrada</h1>
      </div>
    );
  }

  const subclases = barbarianData.subclases;

  {
    /*Información tabla básicos */
  }
  const infoTableData = barbarianData.info_table
    ? barbarianData.info_table.map((item) => {
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
  const traitsData = barbarianData.progresion_por_nivel.map((nivel) => ({
    nivel: nivel.nivel,
    bonificador_por_competencia: nivel.bonificador_por_competencia,
    rasgos: nivel.rasgos.map((rasgo) => rasgo.nombre).join(", "),
    furias: nivel.furias.usos_por_descanso,
    daño_por_furia: nivel.furias.daño_adicional,
    maestria_con_armas: nivel.maestria_con_armas,
  }));

  return (
    <div className="w-full p-10 flex flex-col md:flex-row gap-10">
      <div
        id="content"
        className="flex flex-col gap-10 justify-center items-center"
      >
        <IconButton
          to="/classes"
          label="Volver atrás"
          classProp="absolute left-10 top-[104px]"
          icon={LeftArrow}
        />
        <h1 className="text-3xl font-inknut text-blue-dark">
          {selectedClass.name}
        </h1>
        <div className="flex flex-col gap-6">
          {selectedClass.description.map((paragraph, index) => (
            <p className="text-blue-primary" key={index}>
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
                  {barbarianData.progresion_por_nivel
                    .filter((nivel) => nivel.nivel === 1)
                    .map((nivel) => (
                      <div key={`nivel-${nivel.nivel}`}>
                        <h3 className="text-xl font-inknut text-red-secondary mt-4">
                          Nivel {nivel.nivel}
                        </h3>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                          {nivel.rasgos.map((rasgo, index) => (
                            <div
                              key={`trait-${nivel.nivel}-${index}`}
                              className="md:w-full"
                            >
                              <h3 className=" text-blue-primary font-inknut">
                                {rasgo.nombre}
                              </h3>
                              <p className=" text-blue-primary whitespace-pre-line text-justify">
                                {rasgo.descripcion}
                              </p>
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

        {barbarianData.progresion_por_nivel
          .filter((nivel) => nivel.nivel > 1)
          .map((nivel) => (
            <div
              key={`nivel-${nivel.nivel}`}
              className="w-full flex flex-col gap-5"
            >
              <h2 className="text-xl font-inknut text-red-secondary">
                Nivel {nivel.nivel}
              </h2>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {nivel.rasgos.map((rasgo, index) => (
                  <div
                    key={`trait-${nivel.nivel}-${index}`}
                    className={` ${
                      nivel.rasgos.length === 1
                        ? "md:w-full "
                        : "md:w-[calc(50%-1rem)]"
                    }`}
                  >
                    <h3 className="text-blue-primary font-inknut">
                      {rasgo.nombre}
                    </h3>
                    <p className="text-blue-primary whitespace-pre-line">
                      {rasgo.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div>
          {subclases.map((subclase, index) => (
            <div id={`subclase-${index}`}>
              <h2 className="text-2xl font-inknut text-blue-dark">
                {index + 1}. {subclase.nombre}
              </h2>
              <p>{subclase.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        id="indice"
        className="sticky top-26 self-start h-fit hidden lg:flex flex-col gap-10"
      >
        <div className="w-48 bg-dirty-white rounded-sm flex flex-col p-2.5 gap-2.5">
          <h2 className="text-red-secondary font-inknut text-xl text-center">
            Índice
          </h2>
          <a
            onClick={() => scrollTo(`#traits`)}
            className="font-inknut underline text-blue-primary hover:bg-zinc-300 hover:cursor-pointer rounded-sm p-1"
          >
            Rasgos
          </a>
          {subclases.map((subclase, index) => (
            <a
              key={`indice-subclase-${index}`}
              onClick={() => scrollTo(`#subclase-${index}`)}
              className="font-inknut underline text-blue-primary hover:bg-zinc-300 hover:cursor-pointer rounded-sm p-1"
            >
              {index + 1}. {subclase.nombre}
            </a>
          ))}
        </div>
        <img src={barbarianIndex} className="rounded-sm" alt="index" />
      </div>
    </div>
  );
}
