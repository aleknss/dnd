import { useParams } from "react-router-dom";
import { PageTitle } from "../hooks/PageTitle";
import { useClasses } from "../contexts/ClassesContext";
import { IconButton } from "../components/Button";
import { LeftArrow } from "../components/svgs/classes";
import { D12 } from "../components/svgs/dices";
import InfoTable from "../components/InfoTable";

export default function ClassPage() {
  PageTitle("clase");

  const { id } = useParams<{ id: string }>();
  const { classes } = useClasses();
  const selectedClass = classes.find((cls) => cls.id === id);

  if (!selectedClass) {
    return (
      <div className="container mx-auto p-4">
        <h1>Clase no encontrada</h1>
      </div>
    );
  }

  const infoTableData = [
    {
      label: "Característica principal",
      value: "Fuerza",
    },
    {
      label: "Dado de puntos de golpe",
      value: (
        <div className="flex items-center gap-2">
          <span className="text-red-secondary">
            <D12 />
          </span>
          <span>1d12 de nivel de {selectedClass.name.toLowerCase()}</span>
        </div>
      ),
    },
    {
      label: "Competencias en tiradas de salvación",
      value: "Fuerza y Constitución",
    },
    {
      label: "Competencias en habilidades",
      value: "Armas sencillas y marciales",
    },
    {
      label: "Competencias con armas",
      value: "Armas sencillas y marciales",
    },
    {
      label: "Entrenamiento con armaduras",
      value: "Armaduras ligeras y medias y escudos",
    },
    {
      label: "Equipo inicial",
      value:
        "Elige A o B: (A) hacha a dos manos, 4 hachas de mano, paquete de explorador y 15 po; o (B) 75 po",
    },
  ];

  return (
    <div className="w-full p-10 flex flex-row gap-10">
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
        <div className="w-full">
          <InfoTable data={infoTableData} />
        </div>
      </div>
      <div id="indice" className="sticky top-26 self-start h-fit">
        <div className="w-48 bg-dirty-white flex flex-col p-2.5 gap-2.5">
          <h2 className="text-red-secondary font-inknut text-xl text-center">
            Índice
          </h2>
        </div>
      </div>
    </div>
  );
}
