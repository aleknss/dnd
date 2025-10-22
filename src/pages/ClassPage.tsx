import { useParams } from "react-router-dom";
import { PageTitle } from "../hooks/PageTitle";
import { useClasses } from "../contexts/ClassesContext";
import { IconButton } from "../components/Button";
import { LeftArrow } from "../components/svgs/classes";
import { D12 } from "../components/svgs/dices";
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

  const isBarbarian =
    selectedClass?.name.toLowerCase() === "bárbaro" ||
    selectedClass?.name.toLowerCase() === "barbarian";

  const infoTableData =
    isBarbarian && barbarianData.info_table
      ? barbarianData.info_table.map((item) => {
          if (item.type === "dice" && item.dice_type === "D12") {
            return {
              label: item.label,
              value: (
                <div className="flex items-center gap-2">
                  <span className="text-red-secondary">
                    <D12 />
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

  const traitsData = isBarbarian
    ? barbarianData.progresion_por_nivel.map((nivel) => ({
        nivel: nivel.nivel,
        bonificador_por_competencia: nivel.bonificador_por_competencia,
        rasgos: nivel.rasgos.map((rasgo) => rasgo.nombre).join(", "),
        furias: nivel.furias.usos_por_descanso,
        daño_por_furia: nivel.furias.daño_adicional,
        maestria_con_armas: nivel.maestria_con_armas,
      }))
    : [];

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
        {isBarbarian ? (
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col 2xl:flex-row gap-5">
              <div className="md:w-auto m-auto shrink-0">
                <InfoTable data={infoTableData} />
              </div>
              <div id="traits" className="flex flex-col">
                <h2 className="text-2xl font-inknut text-blue-dark">Rasgos</h2>
                <div className="flex flex-col gap-4 mt-4">
                  {barbarianData.progresion_por_nivel
                    .filter((nivel) => nivel.nivel === 1)
                    .map((nivel) => (
                      <div key={`nivel-${nivel.nivel}`}>
                        <h2 className="text-xl font-inknut text-blue-dark mt-4">
                          Nivel {nivel.nivel}
                        </h2>
                        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
                          {nivel.rasgos.map((rasgo, index) => (
                            <Card
                              key={`trait-${nivel.nivel}-${index}`}
                              title={`${rasgo.nombre}`}
                              className={
                                nivel.rasgos.length === 1
                                  ? "md:w-full"
                                  : "md:w-[calc(50%-1rem)]"
                              }
                            >
                              <p className="text-sm text-blue-primary">
                                {rasgo.descripcion}
                              </p>
                            </Card>
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
        ) : (
          <div className="w-full">
            <InfoTable data={infoTableData} />
          </div>
        )}

        {barbarianData.progresion_por_nivel
          .filter((nivel) => nivel.nivel > 1)
          .map((nivel) => (
            <div
              key={`nivel-${nivel.nivel}`}
              className="w-full flex flex-col gap-5"
            >
              <h2 className="text-xl font-inknut text-blue-primary">
                Nivel {nivel.nivel}
              </h2>
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {nivel.rasgos.map((rasgo, index) => (
                  <Card
                    key={`trait-${nivel.nivel}-${index}`}
                    title={`${rasgo.nombre}`}
                    className={
                      nivel.rasgos.length === 1
                        ? "md:w-full"
                        : "md:w-[calc(50%-1rem)]"
                    }
                  >
                    <p className="text-sm text-blue-primary">
                      {rasgo.descripcion}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
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
            className="font-inknut underline text-xl hover:bg-zinc-300 hover:cursor-pointer rounded-sm p-1"
          >
            Rasgos
          </a>
        </div>
        <img
          src={barbarianIndex}
          className="rounded-sm"
          alt="barbarian-index"
        />
      </div>
    </div>
  );
}
