import { ConsoleSender } from "../command";

export type Category = "system" | "combat" | "resource" | "social";
export const categoryStr: Category[] = [
  "system",
  "combat",
  "resource",
  "social",
];
export const isCategory = (str: string) =>
  categoryStr.includes(str as Category);
export interface Option {
  options: string[];
  description: string;
  needValue: boolean;
}

export abstract class Executable {
  public name: string;
  public aliases: string[];
  public params: Option[];
  public category: Category;
  public desc: string;
  public usage: string;

  constructor(
    name: string,
    aliases: string[],
    params: Option[],
    category: Category,
    desc: string,
    usage: string
  ) {
    this.name = name;
    this.aliases = aliases;
    this.params = [...params];
    this.category = category;
    this.desc = desc;
    this.usage = usage;
  }

  public abstract run(
    append: ConsoleSender,
    option: Map<string, string>,
    args: string[]
  ): void;
}
