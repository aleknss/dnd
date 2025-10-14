import { useParams } from "react-router-dom";
import { PageTitle } from "../hooks/PageTitle";
import { useClasses } from "../contexts/ClassesContext";
import { IconButton } from "../components/Button";
import { LeftArrow } from "../components/svgs";

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

  return (
    <div className="w-full p-10">
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
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
