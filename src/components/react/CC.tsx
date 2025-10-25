interface CCProps {
  type:
    | "by" // 創用 CC 姓名標示
    | "by-nc" // 創用 CC 姓名標示-非商業性
    | "by-nd" // 創用 CC 姓名標示-禁止改作
    | "by-sa" // 創用 CC 姓名標示-相同方式分享
    | "by-nc-sa" // 創用 CC 姓名標示-非商業性-相同方式分享
    | "by-nc-nd" // 創用 CC 姓名標示-非商業性-禁止改作
    | "by-nc-sa"; // 創用 CC 姓名標示-非商業性-相同方式分享
  lang: string;
}

export default function CC({ type, lang }: CCProps) {
  const isZH = lang === "zh-TW";

  const ccSVGs = {
    by: "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg",
    "by-nc":
      "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc.svg",
    "by-nd":
      "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nd.svg",
    "by-sa":
      "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg",
    "by-nc-sa":
      "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg",
    "by-nc-nd":
      "https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg",
  };

  const ccDescriptions = {
    by: isZH
      ? "創用 CC 姓名標示 4.0 國際 授權條款"
      : "Creative Commons Attribution 4.0 International License",
    "by-nc": isZH
      ? "創用 CC 姓名標示-非商業性 4.0 國際 授權條款"
      : "Creative Commons Attribution-NonCommercial 4.0 International License",
    "by-nd": isZH
      ? "創用 CC 姓名標示-禁止改作 4.0 國際 授權條款"
      : "Creative Commons Attribution-NoDerivatives 4.0 International License",
    "by-sa": isZH
      ? "創用 CC 姓名標示-相同方式分享 4.0 國際 授權條款"
      : "Creative Commons Attribution-ShareAlike 4.0 International License",
    "by-nc-sa": isZH
      ? "創用 CC 姓名標示-非商業性-相同方式分享 4.0 國際 授權條款"
      : "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License",
    "by-nc-nd": isZH
      ? "創用 CC 姓名標示-非商業性-禁止改作 4.0 國際 授權條款"
      : "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License",
  };

  return (
    <a
      href={`https://creativecommons.org/licenses/${type.toLowerCase()}/4.0/`}
      target="_blank"
    >
      <div className="flex items-center gap-2">
        <img
          src={ccSVGs[type]}
          alt={type}
          className="h-10 w-auto object-contain"
        />

        <p className="text-muted-foreground text-sm">{ccDescriptions[type]}</p>
      </div>
    </a>
  );
}
