import PartAniShowcase from "./PartAniShowcase";
import PartShowCase from "./PartShowcase";

export default function PartCompiler() {
  const partArray = [
    "truss",
    "lineSpeaker",
    "fogMachine",
    "subwoofer",
    "mainScreen",
    "police",
    "delayTower",
    "frontFillSpeaker",
    "stageMonitor",
    "enstrumants",
    "sideScreen",
  ];
  const aniArray = [
    ["light1Bot", "lights"],
    ["light1Top", "lights"],
    ["light2Bot", "lights"],
    ["light2Top", "lights"],
    ["light3Bot", "lights"],
    ["light3Top", "lights"],
  ];
  return (
    <>
      {partArray.map((part) => (
        <PartShowCase name={part} key={part} />
      ))}
      {aniArray.map((part) => (
        <PartAniShowcase name={part[0]} aniKey={part[1]} key={part[0]} />
      ))}
    </>
  );
}
