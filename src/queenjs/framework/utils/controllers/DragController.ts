import { Bus } from "../../comm/bus";

interface DropItem {
  data: any;
  name: string;
  type: string | string[];
  target: HTMLElement;
  handlers: { [name: string]: (e: any) => void };
}

interface DragItem {
  type: string;
  data: any;
}

export class DragController extends Bus {
  private dropElements: DropItem[] = [];
  private dropEditables: DropItem[] = [];

  private dragTarget: DragItem | null = null;
  
  dragStart = (drag: DragItem) => {
    this.dragTarget = drag;
    const drops = this.dropElements.filter((drop) => {
      const filterType = typeof drop.type;
      if (filterType == "object" || filterType == "string") {
        const rule =
          filterType === "string"
            ? drop.type
            : //@ts-ignore
              drop.type.map((d) => `(${d})`).join("|");
        const reg = new RegExp(
          `^${rule.replaceAll(".", "\\.").replaceAll("*", ".*")}$`
        );
        return reg.test(drag.type);
      } else if (filterType == "function") {
        //@ts-ignore
        return drop.type(drag);
      }
      return false;
    });

    this.dropEditables = drops;
    drops.forEach((drop) => {
      drop.target.classList.add("editable");

      ["enter", "leave", "over", "drop"].forEach((type, i) => {
        drop.handlers[type] = (e) => {
          type == "over" && e.preventDefault();
          this.emit(type, e, this.dragTarget);
          this.emit(`${type}:${drop.name}`, e, this.dragTarget, drop.data);
        };
        drop.target.addEventListener(
          (i < 3 ? "drag" : "") + type,
          drop.handlers[type]
        );
      });
    });
  };

  dragEnd = () => {
    this.dragTarget = null;
    this.dropEditables.forEach((drop) => {
      drop.target.classList.remove("editable");
      ["enter", "leave", "over", "drop"].forEach((type, i) => {
        drop.target.removeEventListener(
          (i < 3 ? "drag" : "") + type,
          drop.handlers[type]
        );
      });
    });
  };

  regDrop = (target: HTMLElement, name: string, type: any, data: any) => {
    this.dropElements.push({ data, name, type, target, handlers: {} });
  };

  unRegDrop = (target: HTMLElement) => {
    const index = this.dropElements.findIndex((drop) => drop.target === target);
    if (index !== -1) {
      this.dropElements.splice(index, 1);
    }
  };
}

export const drager = new DragController();
