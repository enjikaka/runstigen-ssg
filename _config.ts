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

site.filter("getProvinces", (pages: SGOGPage[]) => {
  const provinces: Record<string, any[]> = {};

  for (const page of pages) {
    const family = page.province;
    provinces[family] = [...(provinces[family] || []), page];
  }

  return Object.entries(provinces)
    .map(([province, pages]) => ({
      name: province,
      slug: pages[0].provinceSlug,
      count: pages.length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

site.filter("getDistricts", (pages: SGOGPage[]) => {
  const districts: Record<string, any[]> = {};

  for (const page of pages) {
    const district = page.district;
    districts[district] = [...(districts[district] || []), page];
  }

  return Object.entries(districts)
    .map(([district, pages]) => ({
      name: district,
      slug: district.toLocaleLowerCase().split(' ').join('-'),
      count: pages.length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

export default site;
