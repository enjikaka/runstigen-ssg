import lume from "lume/mod.ts";
import picture from "lume/plugins/picture.ts";
import transform_images from "lume/plugins/transform_images.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import relative_urls from "lume/plugins/relative_urls.ts";
import resolve_urls from "lume/plugins/resolve_urls.ts";

const site = lume();

site.use(slugify_urls());
site.use(picture());
site.use(relative_urls());
site.use(resolve_urls());
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

site.add("js");
site.add("css");

site.filter("getProvinces", () => {
  const provinces = new Map<string, string>();

  site.search.pages("type=sgog").forEach((page) => {
    provinces.set(page.provinceSlug, page.province);
  });

  return Array.from(provinces.entries()).map(([slug, name]) => {
    return {
      slug,
      name,
    };
  }).filter((province) => province.slug && province.name);
});

site.filter("getProvincesNames", () => {
  return [...new Set(site.search.pages("type=sgog").map((page) => page.province))].filter((province) => province);
});

site.filter("getDistrictsNames", () => {
  return [...new Set(site.search.pages("type=sgog").filter((page) => page.province).map((page) => page.district))].filter((district) => district);
});

export default site;
