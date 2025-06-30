import { useEffect, useState } from "react";


const useSvg = (svg:any) => {
  const [svgUrl, setSvgUrl] = useState<any>(null);
  useEffect(() => {
      if (svg) {
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        setSvgUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    }, [svg]);
    return svgUrl
}

export default useSvg;