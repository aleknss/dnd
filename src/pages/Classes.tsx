import ClassPanel from "../components/ClassPanel";
import ClassHeader from "../Layout/ClassHeader";
import { gallery } from "../assets/classgallery";
import { useClasses } from "../contexts/ClassesContext";
import { PageTitle } from "../hooks/PageTitle";

const imgMap: Record<string, string> = {
  barbarian: gallery.barbarian,
  bard: gallery.bard,
  cleric: gallery.cleric,
  druid: gallery.druid,
  fighter: gallery.fighter,
  monk: gallery.monk,
  paladin: gallery.paladin,
  ranger: gallery.ranger,
  rogue: gallery.rogue,
  sorcerer: gallery.sorcerer,
  warlock: gallery.warlock,
  wizard: gallery.wizard,
  artificer: gallery.artificer,
};

export default function Classes() {
  const { classes } = useClasses();
  PageTitle("clases");

  return (
    <div>
      <ClassHeader />
      {classes.map((cls) => (
        <ClassPanel
          key={cls.id}
          id={cls.id}
          name={cls.name}
          image={imgMap[cls.id]}
          description={cls.description}
          ability={cls.ability}
        />
      ))}
    </div>
  );
}
