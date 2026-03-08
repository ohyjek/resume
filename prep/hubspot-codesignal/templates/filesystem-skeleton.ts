type Command =
  | { op: "mkdir"; path: string }
  | { op: "add"; path: string; content: string }
  | { op: "read"; path: string }
  | { op: "ls"; path: string }
  | { op: "rm"; path: string };

type Output = string[];

class NodeEntry {
  isFile = false;
  content = "";
  children = new Map<string, NodeEntry>();
}

class FileSystem {
  private root = new NodeEntry();

  private splitPath(path: string): string[] {
    return path.split("/").filter(Boolean);
  }

  private walk(path: string, create = false): NodeEntry | undefined {
    const parts = this.splitPath(path);
    let node = this.root;
    for (const part of parts) {
      if (node.isFile) {
        return undefined;
      }
      if (!node.children.has(part) && create) {
        node.children.set(part, new NodeEntry());
      }
      const next = node.children.get(part);
      if (!next) {
        return undefined;
      }
      node = next;
    }
    return node;
  }

  ls(path: string): string[] {
    if (path === "/") {
      return [...this.root.children.keys()].sort();
    }

    const parts = this.splitPath(path);
    const node = this.walk(path);
    if (!node) {
      return [];
    }
    const name = parts[parts.length - 1];

    if (node.isFile) {
      return [name];
    }
    return [...node.children.keys()].sort();
  }

  mkdir(path: string): void {
    this.walk(path, true);
  }

  addContentToFile(filePath: string, content: string): void {
    const parts = this.splitPath(filePath);
    const fileName = parts.pop()!;
    const parentPath = `/${parts.join("/")}`;
    const parent = this.walk(parentPath, true);
    if (!parent || parent.isFile) {
      return;
    }

    if (!parent.children.has(fileName)) {
      const file = new NodeEntry();
      file.isFile = true;
      parent.children.set(fileName, file);
    }

    const file = parent.children.get(fileName)!;
    file.content += content;
  }

  readContentFromFile(filePath: string): string {
    return this.walk(filePath)?.content ?? "";
  }

  rm(path: string): void {
    const parts = this.splitPath(path);
    if (parts.length === 0) {
      this.root.children.clear();
      this.root.content = "";
      this.root.isFile = false;
      return;
    }

    const name = parts.pop()!;
    const parentPath = `/${parts.join("/")}`;
    const parent = this.walk(parentPath);
    if (!parent || parent.isFile) {
      return;
    }

    parent.children.delete(name);
  }
}

export function solve(commands: Command[]): Output {
  const fs = new FileSystem();
  const out: Output = [];

  for (const cmd of commands) {
    switch (cmd.op) {
      case "mkdir":
        fs.mkdir(cmd.path);
        break;
      case "add":
        fs.addContentToFile(cmd.path, cmd.content);
        break;
      case "read":
        out.push(fs.readContentFromFile(cmd.path));
        break;
      case "ls":
        out.push(fs.ls(cmd.path).join(","));
        break;
      case "rm":
        fs.rm(cmd.path);
        break;
    }
  }

  return out;
}
