import { SecondHeaderButton } from "../components/Button";
import {
  Axe,
  Mask,
  Book,
  Bow,
  Dagger,
  Gear,
  Grail,
  Shield,
  Sparkle,
  Sword,
  Tentacle,
  Tree,
  YinYang,
} from "../components/svgs";
import { useClasses } from "../contexts/ClassesContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  barbarian: Axe,
  bard: Mask,
  cleric: Grail,
  druid: Tree,
  fighter: Sword,
  monk: YinYang,
  paladin: Shield,
  ranger: Bow,
  rogue: Dagger,
  sorcerer: Sparkle,
  warlock: Tentacle,
  wizard: Book,
  artificer: Gear,
};

export default function ClassHeader() {
  const { classes } = useClasses();

  const scrollTo = (elementId: string) => {
    const targetElement = document.querySelector(elementId);
    if (!targetElement) return;
    const headerHeight = 128;
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="w-full h-16 flex flex-row justify-center gap-8 flex-wrap items-center bg-dirty-white sticky top-16">
        {classes.map((cls) => {
          const IconComponent = iconMap[cls.id];
          return (
            <SecondHeaderButton
              key={cls.id}
              icon={IconComponent}
              label={cls.name}
              onClick={() => scrollTo(`#${cls.id}`)}
            />
          );
        })}
      </div>
    </>
  );
}
