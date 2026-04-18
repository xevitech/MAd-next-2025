import { Template } from "@/hooks/Interface";

export const DefaultTemplates: Template[]  = [
  {
    id: 1,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/about-6.jpg",
    html: '${BASE_URL}/mini-site/company_profile/companyDetail-html.html?slug=Lalit',
    url:'${BASE_URL}/mini-site/company_profile/companyDetail-html.html?slug=Lalit',
    templateType: "default",
  },
  // {
  //   id: 2,
  //   type: "home",
  //   name: "Home",
  //   thumbnail: "/assets/about-6.jpg",
  //   html: homeHtml,
  //   templateType: "default",
  // },
];
