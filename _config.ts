import lume from "lume/mod.ts";
import picture from "lume/plugins/picture.ts";
import transform_images from "lume/plugins/transform_images.ts";

const site = lume();

site.use(picture());
site.use(transform_images());
site.add("/sgog");

site.filter("getProvinces", (value) => {
  return value[0].province;
});

interface SGOGPage extends Lume.Page {
  province: string;
  district: string;
}

site.filter("onlyProvince", (pages: SGOGPage[], province: string) => {
  return pages.filter((page) => page.province === province);
});

site.filter("onlyDistrict", (pages: SGOGPage[], district: string) => {
  return pages.filter((page) => page.district === district);
});

site.filter("getProvinces", () => {
  return [...new Set(site.search.pages("type=sgog").map((page) => page.province))];
});

site.filter("getDistricts", () => {
  return [...new Set(site.search.pages("type=sgog").filter((page) => page.province).map((page) => page.district))];
});

export default site;
