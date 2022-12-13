export type Category = "system" | "combat" | "resource" | "social";

export abstract class Executable {
  public name: string;
  public aliases: string[];
  public params: string[];
  public category: Category;
  public desc: string;
  public usage: string;

  constructor(
    name: string,
    aliases: string[],
    params: string[],
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

  public abstract run(): void;
}
