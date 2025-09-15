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

export default site;
