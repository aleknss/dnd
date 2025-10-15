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
import { useScrollTo } from "../hooks/useScrollTo";

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
  const { scrollTo } = useScrollTo(128);
  return (
    <>
      <div className="w-full min-h-12 min-[1880px]:h-16 flex flex-row justify-center gap-4 flex-wrap items-center bg-dirty-white sticky top-16">
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
