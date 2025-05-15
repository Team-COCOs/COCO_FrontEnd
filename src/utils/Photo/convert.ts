export function convertHtmlToJsxString(html: string): string {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const convertNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const tag = el.tagName.toLowerCase();

      const styleObj: Record<string, string> = {};
      el.getAttribute("style")
        ?.split(";")
        .forEach((s) => {
          const [key, value] = s.split(":").map((str) => str.trim());
          if (key && value) {
            const camelKey = key.replace(/-([a-z])/g, (_, g1) =>
              g1.toUpperCase()
            );
            styleObj[camelKey] = value;
          }
        });

      const styleStr = Object.keys(styleObj).length
        ? ` style={{ ${Object.entries(styleObj)
            .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
            .join(", ")} }}`
        : "";

      const children = Array.from(el.childNodes).map(convertNode).join("");

      return `<${tag}${styleStr}>${children}</${tag}>`;
    }

    return "";
  };

  return Array.from(wrapper.childNodes).map(convertNode).join("");
}
