import AppText from "@/src/components/AppText/AppText";
import ClientIcon from "@/src/components/ClientIcon/ClientIcon";
import Image from "next/image";

const INFO_OPTIONS = [
  {
    name: "Покупателям",
    links: [
      { label: "Вопрос-ответ", link: "/help" },
      { label: "Правила продажи", link: "/catalog" },
      { label: "Политика обработки персональных данных", link: "/contacts" },
    ],
  },
  {
    name: "Партнерам",
    links: [
      { label: "Стать поставщиком", link: "/help" },
      { label: "Перейти в магазин", link: "/catalog" },
      { label: "Вопрос-ответ", link: "/help" },
    ],
  },
  {
    name: "Компания",
    links: [
      { label: "О нас", link: "/help" },
      { label: "Статьи", link: "/catalog" },
      { label: "Контакты", link: "/help" },
      { label: "Вакансии", link: "/help" },
      { label: "Поддержка", link: "/help" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-white rounded-[25px] mt-2 lg:max-w-[1440px] mx-auto p-7 flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <div className="relative w-[270px] h-10">
          <Image src="logo.svg" fill alt="logo" />
        </div>
        <AppText className="text-light-gray font-medium text-sm">
          [Бренд] – это современная B2B-платформа,
          <p>объединяющая поставщиков и покупателей,</p>
          <p>позволяя бизнесу быстро находить выгодные</p>
          <p> предложения.</p>
        </AppText>

        <div className="flex flex-row gap-2">
          <div className="bg-primary rounded-full p-2">
            <ClientIcon name="whatsapp" className="h-6 w-6 !text-white" />
          </div>
          <div className="bg-primary rounded-full p-2">
            <ClientIcon name="telegram" className="h-6 w-6 !text-white" />
          </div>
        </div>
      </div>

      {INFO_OPTIONS.map((item) => (
        <div key={item.name}>
          <AppText className="text-black font-semibold">{item.name}</AppText>
        </div>
      ))}
    </div>
  );
};

export default Footer;
