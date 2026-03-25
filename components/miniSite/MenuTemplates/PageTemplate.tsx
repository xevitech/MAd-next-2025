import { Template } from "@/hooks/Interface";
const assetPrefix =
  process.env.NODE_ENV === "production"
    ? "https://www.merchantad.com//"
    : "https://www.merchantad.com//";

export const PageTemplate: Template[] = [
  {
    id: 1,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page1.png",
    html: `<div>
        <div>
            <img src="/assets/smartediting/pageOne/banner.png" alt="" class="img-fluid" style="height:100%;widht:100%;max-height:100%;min-width:100%">
        </div>
        <div class="row m-0">
            <div class="col-12">
                <div>
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;text-align: center;">
                        ABOUT OUR COMPANY
                    </p>
                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>
            <div class="col-sm-4 col-lg-3 col-xl-3">
                <div class="row">
                    <div class="col-12 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageOne/Image2N2.png" alt="" class="w-100" style="height:346px;max-height:346px;">
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <div
                            style="background-color: #E8E8E8;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;padding: 20px;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <p style="font-size: 40px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                2.8k
                            </p>
                            <p style="font-size: 20px;font-weight: 600;color: #8E8E8E;text-align:center;">
                                Completed Projects
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 col-lg-3 col-xl-3">
                <div class="row">
                    <div class="col-12 mt-3">
                        <div
                            style="background-color: #E8E8E8;border-top-left-radius: 30px;border-top-right-radius: 30px;padding: 20px;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <p style="font-size: 40px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                15+
                            </p>
                            <p style="font-size: 20px;font-weight: 600;color: #8E8E8E;text-align:center;">
                                Years Of Experience
                            </p>
                        </div>
                    </div>
                    <div class="col-12 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageOne/Image2N2.png" alt="" class="w-100" style="height:346px;max-height:346px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 col-lg-6 col-xl-6">
                <div style="border-bottom: 1px solid #C6C6C6;" class="mt-3">
                    <p style="font-size: 30px;font-weight: 600;color: #231F20;">
                        Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                    </p>
                </div>
                <div style="margin-top: 30px;">
                    <p style="font-size: 12px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                        ipsum
                        dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis
                        tellus.
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
                        elit
                        sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                        dictum
                        est a, mattis tellus.
                    </p>
                    <p style="font-size: 12px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
                        elit
                        sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                        dictum
                        est a, mattis tellus.
                        Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
                        elit
                        sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                        dictum
                        est a, mattis tellus.
                    </p>
                </div>
                <div class="row m-0">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div style="background-color: #E8E8E8;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;padding: 20px;display: flex;justify-content: center;align-items: center;flex-direction: column;"
                            class="mt-3">
                            <p style="font-size: 40px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                8K+
                            </p>
                            <p style="font-size: 20px;font-weight: 600;color: #8E8E8E;text-align:center;">
                                Happy Clients
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div style="background-color: #E8E8E8;border-bottom-left-radius: 30px;border-bottom-right-radius: 30px;padding: 20px;display: flex;justify-content: center;align-items: center;flex-direction: column;"
                            class="mt-3">
                            <p style="font-size: 40px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                50+
                            </p>
                            <p style="font-size: 20px;font-weight: 600;color: #8E8E8E;text-align:center;">
                                Proffesional Members
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section style="margin-top: 30px;">
            <div class="row m-0">
                <div class="col-12">
                    <div style="display: flex;justify-content: center;flex-direction: column;">
                        <p
                            style="font-size: 18px;font-weight: 600;color: #d7282f;text-align: center;margin-bottom: 0px;">
                            SERVICES
                        </p>
                        <p style="font-size: 30px;font-weight: 700;color: #231F20;text-align: center;">
                            OUR SERVICES
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            Praesent
                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                            Suspendisse
                            ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                            diam
                            sit amet lacinia. Aliquam in elementum tellus. lore
                        </p>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                    <div
                        style="padding: 70px 35px 50px 35px;box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.10);background-color: #fff;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <div style="text-align: center;">
                            <img src="/assets/smartediting/pageOne/addicon.png" alt="" width="47" height="60" style="width: 47px;height: 60px;max-height:60px;max-width:47px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor
                            </p>
                        </div>
                        <div style="width: 100%;height: 1px;background-color: #e9e9e9;"></div>
                        <div style="margin-top: 30px;min-height: 162px;height: 162px;overflow: auto;">
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget lorem
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                    <div
                        style="padding: 70px 35px 50px 35px;box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.10);background-color: #fff;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <div style="text-align: center;">
                            <img src="/assets/smartediting/pageOne/addicon.png" alt="" width="47" height="60"  style="width: 47px;height: 60px;max-height:60px;max-width:47px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor
                            </p>
                        </div>
                        <div style="width: 100%;height: 1px;background-color: #e9e9e9;"></div>
                        <div style="margin-top: 30px;min-height: 162px;height: 162px;overflow: auto;">
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Sequi est totam quidem possimus minus sit, nulla nam
                                excepturi
                                vero ipsam laboriosam? Placeat necessitatibus quis maiores quisquam et possimus ipsum
                                eaque?
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                    <div
                        style="padding: 70px 35px 50px 35px;box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.10);background-color: #fff;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <div style="text-align: center;">
                            <img src="/assets/smartediting/pageOne/addicon.png" alt="" width="47" height="60" style="width: 47px;height: 60px;max-height:60px;max-width:47px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor
                            </p>
                        </div>
                        <div style="width: 100%;height: 1px;background-color: #e9e9e9;"></div>
                        <div style="margin-top: 30px;min-height: 162px;height: 162px;overflow: auto;">
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Sequi est totam quidem possimus minus sit, nulla nam
                                excepturi
                                vero ipsam laboriosam? Placeat necessitatibus quis maiores quisquam et possimus ipsum
                                eaque?
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                    <div
                        style="padding: 70px 35px 50px 35px;box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.10);background-color: #fff;display: flex;justify-content: center;align-items: center;flex-direction: column;">
                        <div style="text-align: center;">
                            <img src="/assets/smartediting/pageOne/addicon.png" alt="" width="47" height="60" style="width: 47px;height: 60px;max-height:60px;max-width:47px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor
                            </p>
                        </div>
                        <div style="width: 100%;height: 1px;background-color: #e9e9e9;"></div>
                        <div style="margin-top: 30px;min-height: 162px;height: 162px;overflow: auto;">
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Sequi est totam quidem possimus minus sit, nulla nam
                                excepturi
                                vero ipsam laboriosam? Placeat necessitatibus quis maiores quisquam et possimus ipsum
                                eaque?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 30px;">
            <div class="row m-0">
                <div class="col-12">
                    <div style="display: flex;justify-content: center;flex-direction: column;">
                        <p
                            style="font-size: 18px;font-weight: 600;color: #d7282f;text-align: center;margin-bottom: 0px;">
                            BEST PROJECTS
                        </p>
                        <p
                            style="font-size: 30px;font-weight: 700;color: #231F20;text-align: center;text-transform: uppercase;">
                            our recent project
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            Praesent
                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                            Suspendisse
                            ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                            diam
                            sit amet lacinia. Aliquam in elementum tellus.
                        </p>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-8 col-xl-8">
                    <div style="height: 100%;display: flex;align-items: stretch;">
                        <img src="/assets/smartediting/pageOne/recentproject1.png" alt="" class=""
                            style="max-width: 100%;width: 100%;object-fit: cover;max-height: 400px;">
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4" style="overflow: hidden;">
                    <div style="height: 100%;display: flex;align-items: stretch;">
                        <img src="/assets/smartediting/pageOne/recentproject2.png" alt=""
                            style="max-width: 100%;width: 100%;object-fit: cover;max-height: 400px;">
                    </div>
                </div>
                <div class="col-sm-12 col-lg-8 col-xl-8" style="margin-top: 30px;">
                    <div style="display: flex;align-items: stretch;height: 100%;">
                        <div class="row m-0">
                            <div class="col-sm-12 col-lg-6 col-xl-6" style="padding-left: 0px;">
                                <div>
                                    <img src="/assets/smartediting/pageOne/recentproject3.png" alt="" class=""
                                        style="max-width: 100%;width: 100%;object-fit: cover;max-height: 400px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6" style="padding-right: 0px;">
                                <div>
                                    <img src="/assets/smartediting/pageOne/recentproject4.png" alt="" class=""
                                        style="max-width: 100%;width: 100%;object-fit: cover;max-height: 400px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-12 col-xl-12" style="margin-top: 30px;padding: 0px;">
                                <div>
                                    <img src="/assets/smartediting/pageOne/recentproject5.png" alt="" class=""
                                        style="max-width: 100%;width: 100%;object-fit: cover;max-height: 400px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 30px;">
                    <div style="height: 100%;display: flex;align-items: stretch;">
                        <img src="/assets/smartediting/pageOne/recentproject6.png" alt="" class=""
                            style="max-width: 100%;width: 100%;object-fit: cover;max-height: 100%;">
                    </div>
                </div>
            </div>
        </section>

        <section style="background-color: #F8F8F8;padding:30px 50px">
            <div class="row m-0">
                <div class="col-12">
                    <div style="display: flex;justify-content: center;flex-direction: column;">
                        <p
                            style="font-size: 18px;font-weight: 600;color: #d7282f;text-align: center;margin-bottom: 0px;">
                            REVIEWS
                        </p>
                        <p style="font-size: 30px;font-weight: 700;color: #231F20;text-align: center;">
                            FROM OUR HAPPY CUSTOMERS
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                        </p>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4">
                    <div style="background-color: #fff;padding: 34px 32px;">
                        <div style="display: flex;align-items: center;gap: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject7.png" alt="" style="height:83px;width:83px;max-height:83px;max-width:83px;border-radius:50%;objec-fit:cover;">
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">NAME
                                    SURNAME
                                </p>
                                <p style="font-size: 10px;font-weight: 600;color: #000;">designation</p>
                            </div>
                        </div>
                        <div style="margin-top: 30px;">
                            <p style="font-size: 13px;font-weight: 300;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet.
                            </p>
                        </div>
                        <div style="margin-top: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject8.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4">
                    <div style="background-color: #fff;padding: 34px 32px;">
                        <div style="display: flex;align-items: center;gap: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject7.png" alt="" style="height:83px;width:83px;max-height:83px;max-width:83px;border-radius:50%;objec-fit:cover;">
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">NAME
                                    SURNAME
                                </p>
                                <p style="font-size: 10px;font-weight: 600;color: #000;">designation</p>
                            </div>
                        </div>
                        <div style="margin-top: 30px;">
                            <p style="font-size: 13px;font-weight: 300;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet.
                            </p>
                        </div>
                        <div style="margin-top: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject8.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4">
                    <div style="background-color: #fff;padding: 34px 32px;">
                        <div style="display: flex;align-items: center;gap: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject7.png" alt="" style="height:83px;width:83px;max-height:83px;max-width:83px;border-radius:50%;objec-fit:cover;">
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">NAME
                                    SURNAME
                                </p>
                                <p style="font-size: 10px;font-weight: 600;color: #000;">designation</p>
                            </div>
                        </div>
                        <div style="margin-top: 30px;">
                            <p style="font-size: 13px;font-weight: 300;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet.
                            </p>
                        </div>
                        <div style="margin-top: 20px;">
                            <img src="/assets/smartediting/pageOne/recentproject8.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`,
  },
  {
    id: 2,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page2.png",
    html: `
     <div>
        <section style="background-image: url('/assets/smartediting/pageTwo/new1.png');background-repeat: no-repeat;padding-top: 60px;">
            <div class="row m-0">
                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                    <div style="margin: 0 auto;width: 90%;">
                        <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                            Lorem ipsum
                        </p>
                        <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus.
                        </p>
                        <div style="margin-top: 50px;margin-bottom: 30px;">
                            <button
                                style="background-color: #d7282f;color: #fff;padding:12px 18px;border: none;border-radius: 8px;">Contact
                                Us</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6 col-xl-6">
                    <div>
                        <img src="/assets/smartediting/pageTwo/new2.png " alt="img" class="img-fluid" style="max-height:624px;max-width:100%;min-height:624px;min-width:100%;border-top-left-radius:100px;">
                    </div>
                </div>
            </div>
        </section>

        <div style="margin-top: 50px;">
            <section style="width: 90%;margin: 0 auto;">

                <div class="row m-0">
                    <div class="col-sm-12 col-lg-4 col-xl-4 d-flex align-items-center">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231F20;text-transform: uppercase;">
                                about your <br> <span style="color: #d7282f;">company</span>
                            </p>
                            <div style="display: flex;align-items: center;gap: 15px;">
                                <div style="width: 40%;height: 1px;background-color: #d7282f;"></div>
                                <div>
                                    <p style="font-size: 20px;font-weight: 400;color: #000;">
                                        Working Since 1990
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;line-height: 17.7px;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum
                                    est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin
                                    lacus, ut interdum tellus elit sed risus.risus sem sollicitudin lacus, ut interdum
                                    tellus
                                    elit sed risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </p>
                            </div>
                            <div style="margin-top: 40px;margin-bottom: 30px;">
                                <button
                                    style="background-color: transparent;border: 2px solid #d7282f;color: #373737;border-radius: 6px;padding: 8px 18px;font-size: 25px;font-weight: 600;">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new3.png" alt="" class="img-fluid" style="max-height:506px;min-height:506px;max-width:100%;min-width:100%;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 d-flex align-items-center">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231F20;text-transform: uppercase;">
                                what we <br> can <span style="color: #d7282f;">offer</span>
                            </p>
                            <div>
                                <ul style="list-style-type: none;padding-left: 0px;">
                                    <li
                                        style="border-bottom: 1px solid #888888;padding-bottom: 20px;font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                        Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    </li>
                                    <li
                                        style="border-bottom: 1px solid #888888;padding-bottom: 20px;font-size: 13px;font-weight: 400;color: #4A4A4A;margin-top: 30px;">
                                        Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    </li>
                                    <li
                                        style="border-bottom: 1px solid #888888;padding-bottom: 20px;font-size: 13px;font-weight: 400;color: #4A4A4A;margin-top: 30px;">
                                        Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    </li>
                                    <li
                                        style="border-bottom: 1px solid #888888;padding-bottom: 20px;font-size: 13px;font-weight: 400;color: #4A4A4A;margin-top: 30px;">
                                        Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    </li>
                                    <li
                                        style="border-bottom: 1px solid #888888;padding-bottom: 20px;font-size: 13px;font-weight: 400;color: #4A4A4A;margin-top: 30px;">
                                        Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div style="margin-top: 50px;">
            <section style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                        OUR <span style="color: #d7282f;">SERVICES</span>
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new4.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    OIL PLATFORMS
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new5.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    THERMAL POWERPLANTS
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new6.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    OIL REFINERIES
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new7.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    GAS FLARES
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new8.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    OIL PUMPS
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 20px;">
                        <div>
                            <img src="/assets/smartediting/pageTwo/new9.png" alt="" class="img-fluid" style="width:100%;max-height:301px;min-height:301px;">
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageTwo/addicon.png" alt="" style="max-height:75px;min-height:75px;min-width:56px;max-width:56px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    SOLAR POWER PLANT
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4A4A4A;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;text-transform: capitalize;">
                        checkout our <span style="color: #d7282f;">recent projects</span>
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="position: relative;">
                            <img src="/assets/smartediting/pageTwo/new10.png" alt="" class="" style="min-height:338.55px;max-height:338.55px;width:100%;max-width:100%;">
                            <div
                                style="position: absolute;bottom: 0px;background-color: #D2D2D2;width: 100%;border-bottom: 3px solid #d7282f;">
                                <p style="font-size: 18px;font-weight: 700;color: #231F20;">
                                    Lorem ipsum dolor sit
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="position: relative;">
                            <img src="/assets/smartediting/pageTwo/new10.png" alt="" class="" style="min-height:338.55px;max-height:338.55px;width:100%;max-width:100%;">
                            <div
                                style="position: absolute;bottom: 0px;background-color: #D2D2D2;width: 100%;border-bottom: 3px solid #d7282f;">
                                <p style="font-size: 18px;font-weight: 700;color: #231F20;">
                                    Lorem ipsum dolor sit
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="position: relative;">
                            <img src="/assets/smartediting/pageTwo/new10.png" alt="" style="min-height:338.55px;max-height:338.55px;width:100%;max-width:100%;">
                            <div
                                style="position: absolute;bottom: 0px;background-color: #D2D2D2;width: 100%;border-bottom: 3px solid #d7282f;">
                                <p style="font-size: 18px;font-weight: 700;color: #231F20;">
                                    Lorem ipsum dolor sit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="margin-top: 50px;background-color: #F0F2F4;padding: 40px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #d7282f;margin-bottom: 0px;">
                        PRAISE <span style="color: #231F20;">FROM OUR CORPORARTE PARTNERS</span>
                    </p>
                    <p style="font-size: 16px;font-weight: 400;color: #4a4a4a;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, <br> metus nec fringilla accumsan, risus sem sollicitudin lacus,
                        ut
                        interdum tellus elit sed risus.
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                        <div
                            style="border-radius: 40px;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #fff;position: relative; padding-bottom: 40px;">
                            <div style="position: absolute;top: 0%;right: 0%;">
                                <img src="/assets/smartediting/pageTwo/new11.png" alt="" style="width:100px;max-width:100px;min-height:107px;max-height:107px;">
                            </div>
                            <div style="display: flex;align-items: center;gap: 20px;padding-top: 40px;">
                                <div
                                    style="border-top-right-radius: 300px;border-bottom-right-radius: 300px;overflow: hidden;">
                                    <img src="/assets/smartediting/pageTwo/new12.png" alt="" style="width:128px;max-width:128px;min-height:87px;max-height:87px;">
                                </div>
                                <div>
                                    <p style="font-size: 22px;font-weight: 600;color: #231F20;">
                                        Name surname
                                    </p>
                                </div>
                            </div>
                            <div
                                style="margin-left: 10%;background-color: #231F20;padding: 40px 30px;border-top-left-radius: 50px;border-bottom-left-radius: 50px;margin-top: 30px;min-height:270px;max-height:270px;overflow:auto;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                                    Sed
                                    dignissim, metus nec fringilla accumsan.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                        <div
                            style="border-radius: 40px;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #fff;position: relative; padding-bottom: 40px;">
                            <div style="position: absolute;top: 0%;right: 0%;">
                                <img src="/assets/smartediting/pageTwo/new11.png" alt="" style="width:100px;max-width:100px;min-height:107px;max-height:107px;">
                            </div>
                            <div style="display: flex;align-items: center;gap: 20px;padding-top: 40px;">
                                <div
                                    style="border-top-right-radius: 300px;border-bottom-right-radius: 300px;overflow: hidden;">
                                    <img src="/assets/smartediting/pageTwo/new13.png" alt="" style="width:128px;max-width:128px;min-height:87px;max-height:87px;">
                                </div>
                                <div>
                                    <p style="font-size: 22px;font-weight: 600;color: #231F20;">
                                        Name surname
                                    </p>
                                </div>
                            </div>
                            <div
                                style="margin-left: 10%;background-color: #231F20;padding: 40px 30px;border-top-left-radius: 50px;border-bottom-left-radius: 50px;margin-top: 30px;min-height:270px;max-height:270px;overflow:auto;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                                    Sed
                                    dignissim, metus nec fringilla accumsan.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                        <div
                            style="border-radius: 40px;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #fff;position: relative; padding-bottom: 40px;">
                            <div style="position: absolute;top: 0%;right: 0%;">
                                <img src="/assets/smartediting/pageTwo/new11.png" alt="" style="min-width:100px;max-width:100px;min-height:107px;max-height:107px;">
                            </div>
                            <div style="display: flex;align-items: center;gap: 20px;padding-top: 40px;">
                                <div
                                    style="border-top-right-radius: 300px;border-bottom-right-radius: 300px;overflow: hidden;">
                                    <img src="/assets/smartediting/pageTwo/new14.png" alt="" style="width:128px;max-width:128px;min-height:87px;max-height:87px;">
                                </div>
                                <div>
                                    <p style="font-size: 22px;font-weight: 600;color: #231F20;">
                                        Name surname
                                    </p>
                                </div>
                            </div>
                            <div
                                style="margin-left: 10%;background-color: #231F20;padding: 40px 30px;border-top-left-radius: 50px;border-bottom-left-radius: 50px;margin-top: 30px;min-height:270px;max-height:270px;overflow:auto;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                                    Sed
                                    dignissim, metus nec fringilla accumsan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  },
  {
    id: 3,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page3.png",
    html: `
    <div>
        <section
            style="background-image: url('/assets/smartediting/pageThree/new1.png');background-repeat: no-repeat;padding-top: 40px;background-size: 100%;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4 d-flex align-items-center">
                        <div>
                            <div>
                                <p style="font-size: 30px;font-weight: 700;color: #231f20;text-transform: capitalize;">
                                    Lorem ipsum <span style="color: #d7282f;">dolor sit </span> amet, consectetur
                                    adipiscing
                                    elit.
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, u t interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit,
                                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
                                    scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu
                                    tempor
                                    urna.
                                </p>
                            </div>
                            <div>
                                <button
                                    style="background-color: #d7282f;color: #fff;border-radius: 30px;text-transform: uppercase;box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.08);border: none;padding: 12px 18px;margin-bottom: 30px;">
                                    contact us
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div>
                            <img src="/assets/smartediting/pageThree/new2.png" alt="" class="w-100" style="min-height:421.94px;max-height:421.94px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                        <div style="display: flex;gap: 20px;">
                            <div>
                                <img src="/assets/smartediting/pageThree/addicon.png" alt="" style="min-height:76px;max-height:76px;max-width:57px;min-width:57px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #000;">
                                    Lorem ipsum dolor sit
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus.
                                </p>
                            </div>
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageThree/addicon.png" alt="" style="min-height:76px;max-height:76px;max-width:57px;min-width:57px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #000;">
                                    Lorem ipsum dolor sit
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus.
                                </p>
                            </div>
                        </div>
                        <div style="display: flex;gap: 20px;margin-top: 30px;">
                            <div>
                                <img src="/assets/smartediting/pageThree/addicon.png" alt="" style="min-height:76px;max-height:76px;max-width:57px;min-width:57px;">
                            </div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #000;">
                                    Lorem ipsum dolor sit
                                </p>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div>
                    <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                        Explore Our Services______
                    </p>
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;line-height: 40px;">
                        We've provides Lot's <span style="color: #d7282f;">Services</span> Here <br> are Our Best
                        services
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageThree/new3.png" alt="" class="img-fluid" style="min-height:327px;max-height:327px;width:100%;max-width:100%;">
                        </div>
                        <div style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                                Oil & Gas
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageThree/new4.png" alt="" class="img-fluid" style="min-height:327px;max-height:327px;width:100%;max-width:100%;">
                        </div>
                        <div style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                                Oil & Gas
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageThree/new5.png" alt="" class="img-fluid" style="min-height:327px;max-height:327px;width:100%;max-width:100%;">
                        </div>
                        <div style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                                Oil & Gas
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageThree/new6.png" alt="" class="img-fluid" style="min-height:327px;max-height:327px;width:100%;max-width:100%;">
                        </div>
                        <div style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                                Oil & Gas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6"
                        style="display: flex;align-items: flex-start;flex-direction: column;justify-content: center;">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                                About Our <span style="color: #d7282f;">Company</span>
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                Donec ut
                                rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem.
                            </p>
                        </div>
                        <div style="margin-top: 30px;">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6 col-xl-6">
                                    <div style="display: flex;gap: 20px;">
                                        <div>
                                            <img src="/assets/smartediting/pageThree/addicon.png" alt="" style="min-height:76px;max-height:76px;max-width:57px;min-width:57px;">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                                Lorem ipsum dolor
                                            </p>
                                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6">
                                    <div style="display: flex;gap: 20px;">
                                        <div>
                                            <img src="/assets/smartediting/pageThree/addicon.png" alt="" style="min-height:76px;max-height:76px;max-width:57px;min-width:57px;">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                                Lorem ipsum dolor
                                            </p>
                                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6" style="border: 1px solid #101010;padding: 0px;">
                        <div class="row no-gutters">
                            <div class="col-sm-12 col-lg-4 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new7.png" alt="" class="w-100" style="height: 264px;max-height:264px;">
                                    <img src="/assets/smartediting/pageThree/new8.png" alt="" class="w-100" style="height: 264px;max-height:264px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-4 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new9.png" alt="" class="w-100" style="min-height:528.38px;max-height:528.38px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;background-color: #2D3844;padding: 40px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <p style="font-size: 18px;font-weight: 600;color: #d7282f;">
                                OUR PROJECTS__________
                            </p>
                            <p style="font-size: 30px;font-weight: 700;color: #fff;line-height: 40px;">
                                Checkout Some of the Our Best <br> <span style="color: #d7282f;">Projects</span>
                            </p>
                        </div>
                        <div>
                            <div class="row no-gutters">
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                    <div>
                                        <img src="/assets/smartediting/pageThree/new10.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                    <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                        <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                            Lorem ipsum dolor <br> sit amet,
                                        </p>
                                        <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                        <div style="margin-top: 20px;">
                                            <p
                                                style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                risus.
                                                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                                taciti
                                                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                                Praesent
                                                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                    <div>
                                        <img src="/assets/smartediting/pageThree/new11.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                    <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                        <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                            Lorem ipsum dolor <br> sit amet,
                                        </p>
                                        <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                        <div style="margin-top: 20px;">
                                            <p
                                                style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                risus.
                                                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                                taciti
                                                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                                Praesent
                                                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                    <div>
                                        <img src="/assets/smartediting/pageThree/new12.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3 ">
                                    <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                        <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                            Lorem ipsum dolor <br> sit amet,
                                        </p>
                                        <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                        <div style="margin-top: 20px;">
                                            <p
                                                style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                risus.
                                                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                                taciti
                                                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                                Praesent
                                                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div class="row no-gutters">
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new13.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor <br> sit amet,
                                    </p>
                                    <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                            Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                            taciti
                                            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                            Praesent
                                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new14.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch mb-3">
                                <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor <br> sit amet,
                                    </p>
                                    <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                            Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                            taciti
                                            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                            Praesent
                                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch ">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new15.png" alt="" class="w-100" style="min-height: 355px;max-height:355px;">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-stretch ">
                                <div style="background-color: #fff;padding: 30px 30px 30px 30px ;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor <br> sit amet,
                                    </p>
                                    <div style="border: 1px solid #BABABA;margin-top: 30px;"></div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;line-height: 17.7px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                            Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent
                                            taciti
                                            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                            Praesent
                                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div style="margin-top: 20px;">
                                    <p style="font-size: 30px;font-weight: 600;color: #fff;">
                                        Having Something in Mind?
                                    </p>
                                    <button
                                        style="background-color: #d7282f;color: #fff;border-radius: 30px;text-transform: uppercase;box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.08);border: none;padding: 12px 18px;margin-bottom: 30px;">
                                        contact us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section style="margin-top: 50px;margin-bottom: 30px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                    <p style="font-size: 18px;font-weight: 600;color: #d7282f;margin-bottom: 0px;">
                        OUR REVIEWS______
                    </p>
                    <p style="font-size: 30px;font-weight: 700;color: #000000;">
                        What Our <span style="color: #d7282f;">Clients Say ?</span>
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.10);padding: 30px;position: relative;">
                            <div style="position: absolute;top: 10%;right: 10%;">
                                <img src="/assets/smartediting/pageThree/quote.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new16.png" alt="" style="min-width:86px;max-width:86px;max-height:87px;min-height:87px;border-radius:20px;">
                                </div>
                                <div>
                                    <p style="font-size: 20px;font-weight: 600;color: #231F20;">
                                        NAME SURNAME
                                    </p>
                                    <p style="font-size: 15px;font-weight: 600;color: #d7282f;">
                                        DESIGINATION
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 12px;font-weight: 600;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit, sit amet feugiat lectus.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageThree/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.10);padding: 30px;position: relative;">
                            <div style="position: absolute;top: 10%;right: 10%;">
                                <img src="/assets/smartediting/pageThree/quote.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new16.png" alt="" style="min-width:86px;max-width:86px;max-height:87px;min-height:87px;border-radius:20px;">
                                </div>
                                <div>
                                    <p style="font-size: 20px;font-weight: 600;color: #231F20;">
                                        NAME SURNAME
                                    </p>
                                    <p style="font-size: 15px;font-weight: 600;color: #d7282f;">
                                        DESIGINATION
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 12px;font-weight: 600;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit, sit amet feugiat lectus.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageThree/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.10);padding: 30px;position: relative;">
                            <div style="position: absolute;top: 10%;right: 10%;">
                                <img src="/assets/smartediting/pageThree/quote.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageThree/new16.png" alt="" style="min-width:86px;max-width:86px;max-height:87px;min-height:87px;border-radius:20px;">
                                </div>
                                <div>
                                    <p style="font-size: 20px;font-weight: 600;color: #231F20;">
                                        NAME SURNAME
                                    </p>
                                    <p style="font-size: 15px;font-weight: 600;color: #d7282f;">
                                        DESIGINATION
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 12px;font-weight: 600;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit, sit amet feugiat lectus.
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageThree/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 4,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page4.png",
    html: `
    <div>
        <section style="background-image: url('/assets/smartediting/pageFour/banner.png');background-repeat: no-repeat;padding: 80px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;">Lorem Ipsum <span
                            style="color: #d7282f;">Dolor
                            Sit </span>Amet
                    </p>
                </div>
                <div>
                    <div class="row">
                        <div class="col-sm-12 col-lg-6 col-xl-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6 col-xl-6">
                                    <div>
                                        <img src="/assets/smartediting/pageFour/gridimg1.png" alt="" style="min-height: 262px;max-height:262px;width:100%;max-width:100%;">
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-start flex-column">
                                    <div>
                                        <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                            Lorem ipsum dolor sit amet
                                        </p>
                                    </div>
                                    <div>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus.
                                        </p>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus.
                                        </p>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Lorem ipsum dolor sit amet,
                                            consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-6 col-xl-6">
                            <div class="row">
                                <div class="col-sm-12 col-lg-6 col-xl-6">
                                    <div>
                                        <img src="/assets/smartediting/pageFour/gridimg2.png" alt="" style="min-height: 262px;max-height:262px;width:100%;max-width:100%;">
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-start flex-column">
                                    <div>
                                        <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                            Lorem ipsum dolor sit amet
                                        </p>
                                    </div>
                                    <div>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus.
                                        </p>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus.
                                        </p>
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Lorem ipsum dolor sit amet,
                                            consectetur
                                            adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-4">
                            <div>
                                <div>
                                    <img src="/assets/smartediting/pageFour/addicon.png" alt=""
                                        style="min-height: 72px;max-height:72px;min-width: 59px;max-width:59px;">
                                </div>
                                <div style="margin-top: 20px;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-4">
                            <div>
                                <div>
                                    <img src="/assets/smartediting/pageFour/addicon.png" alt=""
                                        style="min-height: 72px;max-height:72px;min-width: 59px;max-width:59px;">
                                </div>
                                <div style="margin-top: 20px;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-4">
                            <div>
                                <div>
                                    <img src="/assets/smartediting/pageFour/addicon.png" alt=""
                                        style="min-height: 72px;max-height:72px;min-width: 59px;max-width:59px;">
                                </div>
                                <div style="margin-top: 20px;">
                                    <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-5 col-xl-5" style="display: flex;align-items: center;">
                        <div>
                            <div>
                                <p style="font-size: 30px;font-weight: 700;color: #231F20;line-height: 40px;">
                                    Lorem ipsum <span style="color: #d7282f;">dolor sit</span> amet, consectetur
                                    adipiscing
                                    elit.
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit,
                                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac
                                    scelerisque ante pulvinar. Donec ut rhoncus ex.
                                </p>
                            </div>
                            <div style="border: 1px solid #C5C5C5;width: 100%;margin-top: 30px;"></div>
                            <div
                                style="background-color: #231F20;padding: 30px;border-left: 5px solid #d7282f;margin-top: 30px;">
                                <em style="font-size: 15px;font-weight: 600;color: #fff;text-align: justify;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus.
                                </em>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-7 col-xl-7">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageFour/col6One.png" alt="" class="w-100"
                                        style="min-height: 263px;max-height:263px">
                                </div>
                                <div style="margin-top: 10px;margin-bottom: 10px;">
                                    <img src="/assets/smartediting/pageFour/col5Two.png" alt="" class="w-100"
                                        style="min-height: 263px;max-height:263px">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageFour/col6three.png" alt="" class="w-100"
                                        style="min-height: 533px;max-height:533px">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                        Lorem ipsum <span style="color: #d7282f;">dolor sit</span> amet,
                    </p>
                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin <br> lacus,
                        ut
                        interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos <br> himenaeos.
                        Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3One.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch mt-3">
                        <div
                            style="background-color: #FDD6D6;display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3Two.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3Three.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3Four.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3Five.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section3Six.png" alt="" class="w-100"
                                style="min-height: 270.09px;max-height:270.09px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch mt-3">
                        <div
                            style="background-color: #FDD6D6;display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                    <p style="font-size: 20px;font-weight: 600;color: #d7282f;margin-bottom: 0px;">
                        BEST PROJECTS
                    </p>
                    <p style="font-size: 30px;font-weight: 700;color: #000;text-align: center;">
                        Checkout Some of Our Best <span style="color: #d7282f;">Projects</span>
                    </p>
                </div>
                <div class="row no-gutters">
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4One.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;border-top: .3px solid black;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4Two.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;border-top: 1px solid black;border-right: 1px solid black;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;border-left: 1px solid black;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4Three.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4Three.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4Four.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;border-bottom: 1px solid black;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div>
                            <img src="/assets/smartediting/pageFour/section4Four.png" alt="" class="w-100"
                                style="min-height: 288.22px;max-height:288.22px;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 d-flex align-items-stretch">
                        <div
                            style="display: flex;justify-content: center;align-items:center;flex-direction: column;padding: 0px 20px;border-right: 1px solid black;border-bottom: 1px solid black;">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;text-align: center;">
                                Lorem ipsum dolor sit amet
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Class aptent taciti sociosqu ad litora
                                torquent
                                per conubia nostra, per inceptos himenaeos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                    <p style="font-size: 20px;font-weight: 600;color: #d7282f;margin-bottom: 0px;">
                        OUR REVIEWS
                    </p>
                    <p style="font-size: 30px;font-weight: 700;color: #000;text-align: center;">
                        WHAT OUR <span style="color: #d7282f;">CLIENTS SAY</span> ABOUT US
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="display: flex;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #FBFBFB;">
                            <div style="background-color: #231F20;padding: 20px;">
                                <img src="/assets/smartediting/pageFour/section5img1.png" alt="" style="min-height: 100px;max-height:100px;min-width:100%;max-width:100%;">
                                <p
                                    style="font-size: 18px;font-weight: 400;color: #fff;margin-top: 20px;margin-bottom: 0px;">
                                    Name Surname
                                </p>
                                <p style="font-size: 10px;font-weight: 400;color: #fff;">
                                    DESIGNATION
                                </p>
                                <div>
                                    <img src="/assets/smartediting/pageFour/stars.png" alt="">
                                </div>
                            </div>
                            <div style="padding: 20px;">
                                <div style="border: 1px solid black;position: relative;">
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;padding: 40px 20px;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                    <div style="position: absolute;top: -10px;left: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote1.png" alt="">
                                    </div>
                                    <div style="position: absolute;bottom: -10px;right: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote2.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="display: flex;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #FBFBFB;">
                            <div style="background-color: #231F20;padding: 20px;">
                                <img src="/assets/smartediting/pageFour/section5img1.png" alt="" style="min-height: 100px;max-height:100px;min-width:100%;max-width:100%;">
                                <p
                                    style="font-size: 18px;font-weight: 400;color: #fff;margin-top: 20px;margin-bottom: 0px;">
                                    Name Surname
                                </p>
                                <p style="font-size: 10px;font-weight: 400;color: #fff;">
                                    DESIGNATION
                                </p>
                                <div>
                                    <img src="/assets/smartediting/pageFour/stars.png" alt="">
                                </div>
                            </div>
                            <div style="padding: 20px;">
                                <div style="border: 1px solid black;position: relative;">
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;padding: 40px 20px;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                    <div style="position: absolute;top: -10px;left: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote1.png" alt="">
                                    </div>
                                    <div style="position: absolute;bottom: -10px;right: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote2.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="display: flex;box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);background-color: #FBFBFB;">
                            <div style="background-color: #231F20;padding: 20px;">
                                <img src="/assets/smartediting/pageFour/section5img1.png" alt="" style="min-height: 100px;max-height:100px;min-width:100%;max-width:100%;">
                                <p
                                    style="font-size: 18px;font-weight: 400;color: #fff;margin-top: 20px;margin-bottom: 0px;">
                                    Name Surname
                                </p>
                                <p style="font-size: 10px;font-weight: 400;color: #fff;">
                                    DESIGNATION
                                </p>
                                <div>
                                    <img src="/assets/smartediting/pageFour/stars.png" alt="">
                                </div>
                            </div>
                            <div style="padding: 20px;">
                                <div style="border: 1px solid black;position: relative;">
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;padding: 40px 20px;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.
                                    </p>
                                    <div style="position: absolute;top: -10px;left: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote1.png" alt="">
                                    </div>
                                    <div style="position: absolute;bottom: -10px;right: -10px;">
                                        <img src="/assets/smartediting/pageFour/quote2.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 5,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page5.png",
    html: `
     <div>
        <section
            style="background-image: url('/assets/smartediting/pageFive/banner.png');background-repeat: no-repeat;background-position: center;">

            <div class="row mx-0">
                <div class="col-sm-12 col-lg-6 col-xl-6"
                    style="background-image: url('./polygon.png');background-repeat: no-repeat;">
                    <div style="padding: 40px 100px;">
                        <div>
                            <p style="font-size: 18px;font-weight: 600;color: #fff;">
                                Lorem ipsum dolor sit
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #fff;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #fff;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
                                sit amet feugiat lectus.
                            </p>
                        </div>
                        <div>
                            <button
                                style="background-color: transparent;color: #fff;border:1px solid #fff;padding: 12px 18px;border-radius: 10px;">
                                contact us
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6 col-xl-6"></div>
            </div>

        </section>

        <section style="background-color: #272B37;padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="border-left: 3px solid #D13C41;padding: 20px;">
                            <p
                                style="font-size: 30px;font-weight: 700;line-height: 40px;color: #fff;text-transform: uppercase;">
                                services
                            </p>
                        </div>
                        <div style="margin-top: 20px;">
                            <p style="font-size: 13px;font-weight: 400;color: #fff;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                            </p>
                        </div>
                        <div style="margin-top: 50px;">
                            <button
                                style="background-color: transparent;color: #fff;border: 1px solid #fff;border-radius: 10px;padding: 10px 18px;">
                                contact us
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="background-color: #fff;border-radius: 10px;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageFive/section2One.png" alt="" class="w-100"
                                    style="min-height: 236.81px;max-height: 236.81px;max-width: 100%;min-width:100%;border-radius: 10px 10px 0 0;">
                            </div>
                            <div style="padding: 30px;">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="background-color: #fff;border-radius: 10px;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageFive/section2One.png" alt="" class="w-100"
                                    style="min-height: 236.81px;max-height: 236.81px;max-width: 100%;min-width:100%;border-radius: 10px 10px 0 0;">
                            </div>
                            <div style="padding: 30px;">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="background-color: #fff;border-radius: 10px;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageFive/section2One.png" alt="" class="w-100"
                                    style="min-height: 236.81px;max-height: 236.81px;max-width: 100%;min-width:100%;border-radius: 10px 10px 0 0;">
                            </div>
                            <div style="padding: 30px;">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus.Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="background-color: #FFF2F2;padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <p style="font-size: 20px;font-weight: 600;color: #D7282f;margin-bottom: 8px;">OUR PROJECTS
                            </p>
                            <p style="font-size: 20px;font-weight: 700;color: #231f20;">
                                Checkout Some Of Our <span style="color: #D7282f;">Best Projects</span>
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                            </p>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;align-items: center;gap: 10px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/arrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit
                                                    amet
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="margin-top: 40px;">
                            <button
                                style="background-color: transparent;border: 2px solid #D7282f;border-radius: 10px;padding: 8px 18px;">contact
                                us</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <img src="/assets/smartediting/pageFive/collage.png" alt="" class="img-fluid"
                                style="min-height: 586px;max-height:586px;min-width:100%;max-width:100%;">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="row m-0 no-gutters">
                <div class="col-sm-12 col-lg-6 col-xl-6" style="background-color: #000;">
                    <div
                        style="padding: 50px 8%;height: 100%;display: flex;align-items: stretch;flex-direction: column;">
                        <div style="display: flex;justify-content: space-between;">
                            <div>
                                <p style="font-size: 30px;font-weight: 700;color: #fff;text-transform: uppercase;">
                                    ABOUT OUR <span style="color: #D7282f;">COMPANY</span>
                                </p>
                            </div>
                            <div
                                style="border: 2px solid #D7282f;border-radius: 22px;background-color: #404040;text-align: center;padding: 10px 32px;line-height: 0px ;">
                                <p
                                    style="font-size: 30px;font-weight: 600;color: #fff;margin-bottom: 0px;line-height: 20px;">
                                    05+ <br>
                                    <span style="font-size: 8px;font-weight: 400;">years of experience</span>
                                </p>
                            </div>
                        </div>

                        <div style="margin-top: 40px;">
                            <p style="font-size: 15px;font-weight: 400;color: #fff;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos.
                            </p>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style="padding-bottom: 0px;">
                                            <div style="display: flex;gap: 15px;">
                                                <div>
                                                    <img src="/assets/smartediting/pageFive/whitearrowicon.svg" alt=""
                                                        style="min-width: 16px;max-width:16px;min-height:14px;max-height:14px;">
                                                </div>
                                                <div>
                                                    <p style="font-size: 16px;font-weight: 400;color: #fff;">
                                                        Lorem ipsum dolor sit amet
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="margin-top: 40px;">
                            <button
                                style="background-color: transparent;border: 2px solid #D7282f;border-radius: 10px;padding: 8px 18px;color: #fff;text-transform: capitalize;">contact
                                us
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-6 col-xl-6">
                    <div style="height: 100%;display: flex;align-items: stretch;">
                        <img src="/assets/smartediting/pageFive/col6image.png" alt="" style="max-width: 100%;max-width: 100%;min-height:575px;max-height:575px;">
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <p
                        style="font-size: 30px;font-weight: 700;color: #231f20;text-transform: uppercase;text-align: center;">
                        Our Clients <span style="color: #D7282f;">Reviews</span>
                    </p>
                </div>
                <div class="row" style="margin-top: 0px;margin-bottom: 40px;">
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="background-color: #231F20;position: relative;padding: 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 4px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 5px;">
                                <img src="/assets/smartediting/pageFive/section5img1.png" alt=""
                                    style="min-width: 100px;max-width: 100px;min-height: 100px;max-height:100px;">
                            </div>
                            <div style="position: absolute;top: -5%;left: 8%;">
                                <img src="/assets/smartediting/pageFive/quote.svg" alt="">
                            </div>
                            <div
                                style="position: absolute;bottom: -4%;width: 85%;padding: 10px;background-color: #D7282f;z-index: -1;">

                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 18px;font-weight: 600;color: #fff;text-align: center;">
                                    Elizabeth / <span style="font-size: 15px;font-weight: 600;color: #fff;"> CEO,Compamy
                                        Name</span>
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageFive/starts.png" alt="">
                            </div>
                            <div style="margin-top: 40px;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="background-color: #231F20;position: relative;padding: 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 4px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 5px;">
                                <img src="/assets/smartediting/pageFive/section5img1.png" alt=""
                                    style="min-width: 100px;max-width: 100px;min-height: 100px;max-height:100px;">
                            </div>
                            <div style="position: absolute;top: -5%;left: 8%;">
                                <img src="/assets/smartediting/pageFive/quote.svg" alt="">
                            </div>
                            <div
                                style="position: absolute;bottom: -4%;width: 85%;padding: 10px;background-color: #D7282f;z-index: -1;">

                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 18px;font-weight: 600;color: #fff;text-align: center;">
                                    Elizabeth / <span style="font-size: 15px;font-weight: 600;color: #fff;"> CEO,Compamy
                                        Name</span>
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageFive/starts.png" alt="">
                            </div>
                            <div style="margin-top: 40px;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="background-color: #231F20;position: relative;padding: 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 4px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 5px;">
                                <img src="/assets/smartediting/pageFive/section5img1.png" alt=""
                                    style="min-width: 100px;max-width: 100px;min-height: 100px;max-height:100px;">
                            </div>
                            <div style="position: absolute;top: -5%;left: 8%;">
                                <img src="/assets/smartediting/pageFive/quote.svg" alt="">
                            </div>
                            <div
                                style="position: absolute;bottom: -4%;width: 85%;padding: 10px;background-color: #D7282f;z-index: -1;">

                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 18px;font-weight: 600;color: #fff;text-align: center;">
                                    Elizabeth / <span style="font-size: 15px;font-weight: 600;color: #fff;"> CEO,Compamy
                                        Name</span>
                                </p>
                            </div>
                            <div>
                                <img src="/assets/smartediting/pageFive/starts.png" alt="">
                            </div>
                            <div style="margin-top: 40px;">
                                <p style="font-size: 16px;font-weight: 400;color: #fff;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 6,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page6.png",
    html: `
    <div>
        <section>
            <div style="position: relative;display: flex;justify-content: center;align-items: center;"
                class="text-center">
                <img src="/assets/smartediting/pageSix/banner.png" alt="" style="width: 100%;">
                <div style="position: absolute;bottom: 0%;">
                    <p style="font-size: 30px;font-weight: 700;color: #fff;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus.
                    </p>
                </div>
            </div>
        </section>

        <section style="background-color: #F5F5F5;padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;text-align: center;">
                        Lorem ipsum <span style="color: #d7292f;">dolor sit</span> amet,
                    </p>
                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Maecenas <br> eget condimentum velit, sit amet feugiat lectus.
                        Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante
                    </p>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <div>
                                <img src="./addicon.png" alt="">
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 18px;font-weight: 600;color: #d7292f;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus,
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <div>
                                <img src="./addicon.png" alt="">
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 18px;font-weight: 600;color: #d7292f;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus,
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <div>
                                <img src="./addicon.png" alt="">
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 18px;font-weight: 600;color: #d7292f;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus,
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                            <div>
                                <img src="./addicon.png" alt="">
                            </div>
                            <div style="margin-top: 20px;">
                                <p style="font-size: 18px;font-weight: 600;color: #d7292f;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus,
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto">
                <div style="display: flex;justify-content: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                        Lorem ipsum <span style="color: #d7292f;">dolor sit</span> amet,
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="border-radius: 20px;border: 1px solid #383636;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageSix/sec3image1.png" alt="" class="w-100">
                            </div>
                            <div style="padding: 20px 30px;" class="text-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="border-radius: 20px;border: 1px solid #383636;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageSix/sec3image1.png" alt="" class="w-100">
                            </div>
                            <div style="padding: 20px 30px;" class="text-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="border-radius: 20px;border: 1px solid #383636;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageSix/sec3image1.png" alt="" class="w-100">
                            </div>
                            <div style="padding: 20px 30px;" class="text-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="border-radius: 20px;border: 1px solid #383636;overflow: hidden;">
                            <div>
                                <img src="/assets/smartediting/pageSix/sec3image1.png" alt="" class="w-100">
                            </div>
                            <div style="padding: 20px 30px;" class="text-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum dolor sit amet
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;text-align: center;align-items: center;">
                        Lorem ipsum <span style="color: #d7292f;">dolor sit</span> amet,
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageSix/sec4image.png" alt="" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">Lorem ipsum dolor sit
                                        amet
                                    </p>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit,
                                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                                        conubia
                                        nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageSix/sec4image.png" alt="" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">Lorem ipsum dolor sit
                                        amet
                                    </p>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit,
                                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                                        conubia
                                        nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageSix/sec4image.png" alt="" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">Lorem ipsum dolor sit
                                        amet
                                    </p>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit,
                                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                                        conubia
                                        nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                        <div class="row">
                            <div class="col-sm-12 col-lg-6 col-xl-6">
                                <div>
                                    <img src="/assets/smartediting/pageSix/sec4image.png" alt="" class="img-fluid">
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">Lorem ipsum dolor sit
                                        amet
                                    </p>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit,
                                        sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
                                        conubia
                                        nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;">
                    <div style="display: flex;justify-content: center;">
                        <p
                            style="font-size: 30px;font-weight: 700;color: #231f20;text-align: center;align-items: center;">
                            Lorem ipsum <span style="color: #d7292f;">dolor sit</span> amet,
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="position: relative;padding: 40px 40px 20px 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 2px;border-radius: 50%;overflow: hidden;">
                                <img src="/assets/smartediting/pageSix/circleimage.png" alt="">
                            </div>
                            <div style="position: absolute;top: 2%;left: 2%;">
                                <img src="/assets/smartediting/pageSix/quote1.svg" alt="">
                            </div>
                            <div style="position: absolute;bottom: 2%;right: 2%;">
                                <img src="/assets/smartediting/pageSix/quote2.svg" alt="">
                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit,
                                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos.
                                </p>
                            </div>
                            <div
                                style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-top: 30px;">
                                <div>
                                    <p
                                        style="font-size: 18px;font-weight: 600;color: #231f20;text-transform: uppercase;margin-bottom: 0px;">
                                        name surname</p>
                                    <p
                                        style="font-size: 15px;font-weight: 400;color: #231f20;text-transform: uppercase;">
                                        designation</p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageSix/stars.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="position: relative;padding: 40px 40px 20px 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 2px;border-radius: 50%;overflow: hidden;">
                                <img src="/assets/smartediting/pageSix/circleimage.png" alt="">
                            </div>
                            <div style="position: absolute;top: 2%;left: 2%;">
                                <img src="/assets/smartediting/pageSix/quote1.svg" alt="">
                            </div>
                            <div style="position: absolute;bottom: 2%;right: 2%;">
                                <img src="/assets/smartediting/pageSix/quote2.svg" alt="">
                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit,
                                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos.
                                </p>
                            </div>
                            <div
                                style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-top: 30px;">
                                <div>
                                    <p
                                        style="font-size: 18px;font-weight: 600;color: #231f20;text-transform: uppercase;margin-bottom: 0px;">
                                        name surname</p>
                                    <p
                                        style="font-size: 15px;font-weight: 400;color: #231f20;text-transform: uppercase;">
                                        designation</p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageSix/stars.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4" style="margin-top: 100px;">
                        <div
                            style="position: relative;padding: 40px 40px 20px 40px;display: flex;justify-content: center;flex-direction: column;align-items: center;box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;">
                            <div
                                style="position: absolute;top: 0%;left: 50%;transform: translate(-50%,-50%);display: flex;justify-content: center;align-items: center;background-color: #fff;padding: 2px;border-radius: 50%;overflow: hidden;">
                                <img src="/assets/smartediting/pageSix/circleimage.png" alt="">
                            </div>
                            <div style="position: absolute;top: 2%;left: 2%;">
                                <img src="/assets/smartediting/pageSix/quote1.svg" alt="">
                            </div>
                            <div style="position: absolute;bottom: 2%;right: 2%;">
                                <img src="/assets/smartediting/pageSix/quote2.svg" alt="">
                            </div>
                            <div style="margin-top: 50px;">
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                    velit,
                                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                    nostra, per inceptos himenaeos.
                                </p>
                            </div>
                            <div
                                style="display: flex;justify-content: space-between;width: 100%;align-items: center;margin-top: 30px;">
                                <div>
                                    <p
                                        style="font-size: 18px;font-weight: 600;color: #231f20;text-transform: uppercase;margin-bottom: 0px;">
                                        name surname</p>
                                    <p
                                        style="font-size: 15px;font-weight: 400;color: #231f20;text-transform: uppercase;">
                                        designation</p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageSix/stars.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 7,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page7.png",
    html: `
    <div>
        <section>
            <div class="row m-0">
                <div class="col-sm-12 col-lg-8 col-xl-8">
                    <div style="position: relative;height: 100%;">
                        <img src="/assets/smartediting/pageSeven/banner.png" alt="" class="w-100" style="object-fit: cover;height: 100%;">
                        <div
                            style="position: absolute;background-color: #000;opacity: 40%;height: 100%;width: 100%;top: 0%;">
                        </div>
                        <div
                            style="position: absolute;top: 50%;left: 30%;transform: translate(-50%,-50%);padding-left: 30px;">
                            <p style="font-size: 30px;font-weight: 700;color: #fff;line-height: 40px;margin: 0px;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <div style="display: flex;align-items: baseline;gap: 20px;">
                                <div style="height: 2px;background-color: #d7282f;width: 10%;"></div>
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #fff;">Lorem ipsum dolor sit amet,
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-4 col-xl-4">
                    <div style="height: 100%;">
                        <div class="row">
                            <div class="col-sm-12 col-lg-12 col-xl-12">
                                <div style="position: relative;">
                                    <img src="/assets/smartediting/pageSeven/banner2.png" alt="" class="w-100" style="height: 228.5px;">
                                    <div
                                        style="position: absolute;background-color: #000;opacity: 40%;height: 100%;width: 100%;top: 0%;">
                                    </div>
                                    <div style="position: absolute;bottom: 0%;padding-left: 30px;">
                                        <p style="font-size: 18px;font-weight: 600;color: #fff;">
                                            Lorem ipsum dolor sit amet,
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-12 col-xl-12 mt-3">
                                <div style="position: relative;">
                                    <img src="/assets/smartediting/pageSeven/banner2.png" alt="" class="w-100" style="height: 228.5px;">
                                    <div
                                        style="position: absolute;background-color: #000;opacity: 40%;height: 100%;width: 100%;top: 0%;">
                                    </div>
                                    <div style="position: absolute;bottom: 0%;padding-left: 30px;">
                                        <p style="font-size: 18px;font-weight: 600;color: #fff;">
                                            Lorem ipsum dolor sit amet,
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-12 col-xl-12 mt-3">
                                <div style="position: relative;">
                                    <img src="/assets/smartediting/pageSeven/banner2.png" alt="" class="w-100" style="height: 228.5px;">
                                    <div
                                        style="position: absolute;background-color: #000;opacity: 40%;height: 100%;width: 100%;top: 0%;">
                                    </div>
                                    <div style="position: absolute;bottom: 0%;padding-left: 30px;">
                                        <p style="font-size: 18px;font-weight: 600;color: #fff;">
                                            Lorem ipsum dolor sit amet,
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="padding: 50px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row no-gutters">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <img src="/assets/smartediting/pageSeven/sec3image.png" alt="" class="w-100">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-start flex-column justify-content-center "
                        style="background-color: #F9F9F9;padding: 10px;">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                Donec ut
                                rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus.
                            </p>
                        </div>
                        <div style="margin-top: 40px;">
                            <button
                                style="border: 2px solid #d7282f;color: #231f20;background-color: transparent;border-radius: 10px;font-size: 20px;font-weight: 700;padding: 8px 18px;text-transform: uppercase;">
                                contact us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 0px ;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row no-gutters">
                    <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-start flex-column justify-content-center "
                        style="background-color: #F9F9F9;padding: 10px;">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                Donec ut
                                rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus.
                            </p>
                        </div>
                        <div style="margin-top: 40px;">
                            <button
                                style="border: 2px solid #d7282f;color: #231f20;background-color: transparent;border-radius: 10px;font-size: 20px;font-weight: 700;padding: 8px 18px;text-transform: uppercase;">
                                contact us
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <img src="/assets/smartediting/pageSeven/sec3image.png" alt="" class="w-100">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;background-color: #F9F9F9;padding: 40px 0px;">
            <div style="width: 90%;margin: 0 auto;">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                        Lorem ipsum dolor sit amet,
                    </p>
                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus <br> elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                        Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim <br> egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
                    </p>
                </div>
                <div class="row no-gutters">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="height: 100%;">
                            <img src="/assets/smartediting/pageSeven/sec4img.png" alt="" class="w-100" style="height: 100%;">
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="height: 100%;">
                            <div class="row">
                                <div class="col-12">
                                    <div style="height: 100%;">
                                        <img src="/assets/smartediting/pageSeven/sec4img2.png" alt="" class="w-100">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div style="height: 100%;">
                                        <img src="/assets/smartediting/pageSeven/sec4img3.png" alt="" class="w-100"
                                            style="box-shadow: inset 5px 5px 10px rgba(255, 0, 0, 1);">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="height: 100%;">
                            <img src="/assets/smartediting/pageSeven/sec4img4.png" alt="" class="w-100" style="height: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section style="margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="text-center">
                    <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                        Lorem ipsum dolor sit amet,
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;padding: 50px 20px 30px 20px;"
                            class="text-center">
                            <div style="border-radius: 50%;height: 120px;width: 120px;display: initial;" class="">
                                <img src="/assets/smartediting/pageSeven/circleimage.png" alt="">
                            </div>
                            <div style="margin-top: 30px;">
                                <p
                                    style="font-size: 18px;font-weight: 600;color: #000;text-align: center;text-transform: uppercase;margin-bottom: 0px;">
                                    NAME SURNAME
                                </p>
                                <p style="font-size: 15px;font-weight: 400;color: #000;text-transform: uppercase;">
                                    DESIGNATION
                                </p>
                            </div>
                            <div style="position: relative; padding: 0px 30px;">
                                <div style="position: absolute;top: 0%;left: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote1.png" alt="">
                                </div>
                                <div style="position: absolute;bottom: 0%;right: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote2.png" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <img src="/assets/smartediting/pageSeven/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;padding: 50px 20px 30px 20px;"
                            class="text-center">
                            <div style="border-radius: 50%;height: 120px;width: 120px;display: initial;" class="">
                                <img src="/assets/smartediting/pageSeven/circleimage.png" alt="">
                            </div>
                            <div style="margin-top: 30px;">
                                <p
                                    style="font-size: 18px;font-weight: 600;color: #000;text-align: center;text-transform: uppercase;margin-bottom: 0px;">
                                    NAME SURNAME
                                </p>
                                <p style="font-size: 15px;font-weight: 400;color: #000;text-transform: uppercase;">
                                    DESIGNATION
                                </p>
                            </div>
                            <div style="position: relative; padding: 0px 30px;">
                                <div style="position: absolute;top: 0%;left: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote1.png" alt="">
                                </div>
                                <div style="position: absolute;bottom: 0%;right: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote2.png" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <img src="/assets/smartediting/pageSeven/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;padding: 50px 20px 30px 20px;"
                            class="text-center">
                            <div style="border-radius: 50%;height: 120px;width: 120px;display: initial;" class="">
                                <img src="/assets/smartediting/pageSeven/circleimage.png" alt="">
                            </div>
                            <div style="margin-top: 30px;">
                                <p
                                    style="font-size: 18px;font-weight: 600;color: #000;text-align: center;text-transform: uppercase;margin-bottom: 0px;">
                                    NAME SURNAME
                                </p>
                                <p style="font-size: 15px;font-weight: 400;color: #000;text-transform: uppercase;">
                                    DESIGNATION
                                </p>
                            </div>
                            <div style="position: relative; padding: 0px 30px;">
                                <div style="position: absolute;top: 0%;left: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote1.png" alt="">
                                </div>
                                <div style="position: absolute;bottom: 0%;right: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote2.png" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <img src="/assets/smartediting/pageSeven/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                        <div style="box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);border-radius: 20px;padding: 50px 20px 30px 20px;"
                            class="text-center">
                            <div style="border-radius: 50%;height: 120px;width: 120px;display: initial;" class="">
                                <img src="/assets/smartediting/pageSeven/circleimage.png" alt="">
                            </div>
                            <div style="margin-top: 30px;">
                                <p
                                    style="font-size: 18px;font-weight: 600;color: #000;text-align: center;text-transform: uppercase;margin-bottom: 0px;">
                                    NAME SURNAME
                                </p>
                                <p style="font-size: 15px;font-weight: 400;color: #000;text-transform: uppercase;">
                                    DESIGNATION
                                </p>
                            </div>
                            <div style="position: relative; padding: 0px 30px;">
                                <div style="position: absolute;top: 0%;left: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote1.png" alt="">
                                </div>
                                <div style="position: absolute;bottom: 0%;right: 0%;">
                                    <img src="/assets/smartediting/pageSeven/quote2.png" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;text-align: center;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">
                                <img src="/assets/smartediting/pageSeven/stars.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 8,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page8.png",
    html: `
       <div style="position: relative;">
            <div style="width:100%">
                <img src="/assets/smartediting/pageEight/blackbg.png" alt="" style="height: 11.5vh;z-index: -1;position: absolute;width:100%;">
            </div>
            <div style="width: 90%;margin: 0 auto;">
                <div style="padding-top: 5%;">
                    <div class="d-lg-flex d-xl-flex d-sm-block justify-content-between w-100 align-items-center">
                        <div>
                            <div style="display: flex;align-items: baseline;gap: 20px;">
                                <div style="height: 3px;background-color: #fff;width: 10%;"></div>
                                <div>
                                    <p style="font-size: 18px;font-weight: 600;color: #fff;">
                                        Lorem ipsum dolor sit amet,
                                    </p>
                                </div>
                            </div>
                            <p style="font-size: 20px;font-weight: 700;color: #fff;">
                                Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit.
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #fff;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a,
                                mattis tellus. Sed dignissim, <br> metus nec fringilla accumsan, risus sem sollicitudin
                                lacus,
                                ut interdum tellus elit sed risus. Maecenas eget condimentum <br> velit, sit amet
                                feugiat
                                lectus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src="/assets/smartediting/pageEight/onbanner.png" alt="" class="w-100">
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div class="text-center">
                            <p style="font-size: 50px;font-weight: 600;color: #d7282f;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div class="text-center">
                            <p style="font-size: 50px;font-weight: 600;color: #d7282f;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div class="text-center">
                            <p style="font-size: 50px;font-weight: 600;color: #d7282f;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3">
                        <div class="text-center">
                            <p style="font-size: 50px;font-weight: 600;color: #d7282f;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-top: 30px;">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231f20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                        </div>
                        <div class="position-relative mb-4">
                            <img src="/assets/smartediting/pageEight/sec2image.png" alt="" class="w-100">
                            <!-- <div class="position-absolute"
                            style="padding: 20px 30px;border-top-right-radius: 30px;border-bottom-right-radius: 30px;background-color: #F8F8F8;bottom: -20%;width: 80%;">
                            <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
                                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia
                                nostra, per inceptos himenaeos.
                            </p>
                        </div> -->
                        </div>
                    </div>
                    <div
                        class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center flex-column justify-content-center">
                        <div
                            style="border-top: 1px dashed #A8A8A8;border-bottom: 1px dashed #A8A8A8;padding: 40px 10px;">
                            <div class="d-lg-flex d-xl-flex d-sm-block align-items-center">
                                <div class="w-50">
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum <br> dolor sit amet,
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style="border-bottom: 1px dashed #A8A8A8;padding: 40px 10px;">
                            <div class="d-lg-flex d-xl-flex d-sm-block align-items-center">
                                <div class="w-50">
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum <br> dolor sit amet,
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style="border-bottom: 1px dashed #A8A8A8;padding: 40px 10px;">
                            <div class="d-lg-flex d-xl-flex d-sm-block align-items-center">
                                <div class="w-50">
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum <br> dolor sit amet,
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div style="border-bottom: 1px dashed #A8A8A8;padding: 40px 10px;">
                            <div class="d-lg-flex d-xl-flex d-sm-block align-items-center">
                                <div class="w-50">
                                    <p style="font-size: 18px;font-weight: 600;color: #231f20;">
                                        Lorem ipsum <br> dolor sit amet,
                                    </p>
                                </div>
                                <div>
                                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie,
                                        dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                                        sem
                                        sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                                        velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent
                                        per
                                        conubia nostra, per inceptos himenaeos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-top: 50px;">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div style="display: flex;align-items: baseline;gap: 20px;">
                            <div style="height: 2px;background-color: #231F20;width: 10%;"></div>
                            <div>
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div>
                            <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus.
                            </p>
                        </div>
                        <div class="row" style="margin-top: 20px;">
                            <div class="col-sm-12 col-lg-6 col-xl-6 mt-3">
                                <div>
                                    <div class="d-lg-flex d-xl-flex d-sm-block"
                                        style="gap: 14px;border-bottom: 1px solid #9C9C9C;padding-bottom: 10px;">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/addicon.png" alt="">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                                Lorem ipsum dolor sit amet,
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 mt-3">
                                <div>
                                    <div class="d-lg-flex d-xl-flex d-sm-block"
                                        style="gap: 14px;border-bottom: 1px solid #9C9C9C;padding-bottom: 10px;">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/addicon.png" alt="">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                                Lorem ipsum dolor sit amet,
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 mt-3">
                                <div>
                                    <div class="d-lg-flex d-xl-flex d-sm-block"
                                        style="gap: 14px;border-bottom: 1px solid #9C9C9C;padding-bottom: 10px;">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/addicon.png" alt="">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                                Lorem ipsum dolor sit amet,
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 col-xl-6 mt-3">
                                <div>
                                    <div class="d-lg-flex d-xl-flex d-sm-block"
                                        style="gap: 14px;border-bottom: 1px solid #9C9C9C;padding-bottom: 10px;">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/addicon.png" alt="">
                                        </div>
                                        <div>
                                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                                Lorem ipsum dolor sit amet,
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin-top: 20px;">
                                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                            molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                                            accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <img src="/assets/smartediting/pageEight/borderedimage.png" alt="" class="img-fluid">
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px;">
                    <div class="row">
                        <div class="col-sm-12 col-lg-5 col-xl-5">
                            <div>
                                <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-7 col-xl-7">
                            <div>
                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                    dictum
                                    est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                    sollicitudin
                                    lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                    feugiat
                                    lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                                    inceptos
                                    himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col4-1.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-8 col-xl-8 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col8-1.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-8 col-xl-8 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col8-2.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col4-2.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col4-3.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col4-3.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-xl-4 mt-3">
                            <div>
                                <img src="/assets/smartediting/pageEight/col4-3.png" alt="" class="w-100">
                            </div>
                            <div style="background-color: #F2F2F2;padding: 10px;">
                                <p style="font-size: 18px;font-weight: 600;color: #231F20;margin-bottom: 0px;">
                                    Lorem ipsum dolor sit amet,
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px;">
                    <div class="text-center">
                        <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                            Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit.
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget <br> condimentum velit, sit amet feugiat
                            lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            Praesent
                            auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. <br>
                            Suspendisse
                            ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                            diam
                            sit amet lacinia. Aliquam in elementum tellus.
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                            <div style="box-shadow:  0px 0px 4px 0px rgba(0, 0, 0, 0.25);padding: 20px 30px 20px 20px;">
                                <div class="row">
                                    <div class="col-sm-12 col-lg-4 col-xl-4">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/col6-img.png" alt="" class="w-100">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-8 col-xl-8">
                                        <div>
                                            <div>
                                                <p
                                                    style="font-size: 18px;font-weight: 600;color: #231F20;text-transform: uppercase;margin-bottom: 0px;">
                                                    name surname
                                                </p>
                                                <p
                                                    style="font-size: 15px;font-weight: 300;color: #231F20;text-transform: uppercase;">
                                                    designation
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                                    turpis
                                                    molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                    fringilla
                                                    accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                    risus.
                                                    Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                                                    aptent
                                                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                                    himenaeos.
                                                </p>
                                            </div>
                                            <div style="margin-top: 50px;">
                                                <img src="/assets/smartediting/pageEight/stars.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                            <div style="box-shadow:  0px 0px 4px 0px rgba(0, 0, 0, 0.25);padding: 20px 30px 20px 20px;">
                                <div class="row">
                                    <div class="col-sm-12 col-lg-4 col-xl-4">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/col6-img.png" alt="" class="w-100">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-8 col-xl-8">
                                        <div>
                                            <div>
                                                <p
                                                    style="font-size: 18px;font-weight: 600;color: #231F20;text-transform: uppercase;margin-bottom: 0px;">
                                                    name surname
                                                </p>
                                                <p
                                                    style="font-size: 15px;font-weight: 300;color: #231F20;text-transform: uppercase;">
                                                    designation
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                                    turpis
                                                    molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                    fringilla
                                                    accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                    risus.
                                                    Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                                                    aptent
                                                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                                    himenaeos.
                                                </p>
                                            </div>
                                            <div style="margin-top: 50px;">
                                                <img src="/assets/smartediting/pageEight/stars.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                            <div style="box-shadow:  0px 0px 4px 0px rgba(0, 0, 0, 0.25);padding: 20px 30px 20px 20px;">
                                <div class="row">
                                    <div class="col-sm-12 col-lg-4 col-xl-4">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/col6-img.png" alt="" class="w-100">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-8 col-xl-8">
                                        <div>
                                            <div>
                                                <p
                                                    style="font-size: 18px;font-weight: 600;color: #231F20;text-transform: uppercase;margin-bottom: 0px;">
                                                    name surname
                                                </p>
                                                <p
                                                    style="font-size: 15px;font-weight: 300;color: #231F20;text-transform: uppercase;">
                                                    designation
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                                    turpis
                                                    molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                    fringilla
                                                    accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                    risus.
                                                    Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                                                    aptent
                                                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                                    himenaeos.
                                                </p>
                                            </div>
                                            <div style="margin-top: 50px;">
                                                <img src="/assets/smartediting/pageEight/stars.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-6 col-xl-6 mt-4">
                            <div style="box-shadow:  0px 0px 4px 0px rgba(0, 0, 0, 0.25);padding: 20px 30px 20px 20px;">
                                <div class="row">
                                    <div class="col-sm-12 col-lg-4 col-xl-4">
                                        <div>
                                            <img src="/assets/smartediting/pageEight/col6-img.png" alt="" class="w-100">
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-8 col-xl-8">
                                        <div>
                                            <div>
                                                <p
                                                    style="font-size: 18px;font-weight: 600;color: #231F20;text-transform: uppercase;margin-bottom: 0px;">
                                                    name surname
                                                </p>
                                                <p
                                                    style="font-size: 15px;font-weight: 300;color: #231F20;text-transform: uppercase;">
                                                    designation
                                                </p>
                                            </div>
                                            <div>
                                                <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                                    turpis
                                                    molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                    fringilla
                                                    accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed
                                                    risus.
                                                    Maecenas eget condimentum velit, sit amet feugiat lectus. Class
                                                    aptent
                                                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                                    himenaeos.
                                                </p>
                                            </div>
                                            <div style="margin-top: 50px;">
                                                <img src="/assets/smartediting/pageEight/stars.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `,
  },
  {
    id: 9,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page9.png",
    html: `
    <div>
        <section>
            <div style="position: relative;">
                <img src="/assets/smartediting/pageNine/page1.jpg" alt="" style="width: 100%;">
                <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">
                    <p style="font-size: 20px;font-weight: 700;color: #EB785F;text-align: center;">
                        TRUSTED WORLDWIDE
                    </p>
                    <p style="font-size: 50px;font-weight: 700;color: #fff;text-align: center;">
                        Lorem ipsum
                    </p>
                    <p style="font-size: 22px;font-weight: 400;color: #fff;text-align: center;">
                        EXPERIENCE <span style="font-size: 40px;font-weight: 400;color: #EB785F;">.</span> INTEGRITY
                        <span style="font-size: 40px;font-weight: 400;color: #EB785F;">.</span> CAPABILITY
                    </p>
                </div>
            </div>
        </section>
        <section style="margin-top: -50px;">
            <div class="" style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-lg-3 col-xl-3 col-sm-12">
                        <div
                            style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 10px;background-color: #fff;padding: 16px;">
                            <p style="font-size: 30px;font-weight: 600;color: #EB785F;">
                                Heading
                            </p>
                            <p style="font-size: 15px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-xl-3 col-sm-12">
                        <div
                            style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 10px;background-color: #fff;padding: 16px;">
                            <p style="font-size: 30px;font-weight: 600;color: #EB785F;">
                                Heading
                            </p>
                            <p style="font-size: 15px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-xl-3 col-sm-12">
                        <div
                            style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 10px;background-color: #fff;padding: 16px;">
                            <p style="font-size: 30px;font-weight: 600;color: #EB785F;">
                                Heading
                            </p>
                            <p style="font-size: 15px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-xl-3 col-sm-12">
                        <div
                            style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 10px;background-color: #fff;padding: 16px;">
                            <p style="font-size: 30px;font-weight: 600;color: #EB785F;">
                                Heading
                            </p>
                            <p style="font-size: 15px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section style="margin-top: 80px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <p style="font-size: 25px;font-weight: 600;color: #EB785F;">
                                ABOUT OUR INDUSTRY
                            </p>
                            <p style="font-size: 40px;font-weight: 700;color: #444444;">
                                HEADING FOR THE SECTION
                            </p>
                            <p style="font-size: 16px;font-weight: 400px;color: #444444;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                molestie,
                                dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit,
                                sit
                                amet feugiat lectus.
                            </p>
                            <div>
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                        <tr>
                                            <td>Lorem ipsum dolor sit amet</td>
                                            <td>Lorem ipsum dolor sit amet</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6 d-flex align-items-center">
                        <div>
                            <img src="/assets/smartediting/pageNine/page10.svg" alt="" class="w-100">
                        </div>
                    </div>
                </div>
        </section>
        <section style="margin-top: 80px;">
            <div style="width: 90%;margin: 0 auto;">
                <div>
                    <p style="font-size: 25px;font-weight: 600;color: #EB785F;margin: 0px;">
                        WHAT WE DO
                    </p>
                    <p style="font-size: 40px;font-weight: 700;color: #444444;margin-top: 0px;">
                        Heading
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div class="card" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div class="card-header"
                                style="background-color: #EB785F;display: flex;align-items: center;">

                                <p style="font-size: 25px;font-weight: 600;color: #fff;margin: 0px;">heading</p>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <div>
                                            <img src="/assets/smartediting/pageNine/page2.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <p style="font-size: 15px;font-weight: 400;color: #444444;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div class="card" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div class="card-header"
                                style="background-color: #EB785F;display: flex;align-items: center;">

                                <p style="font-size: 25px;font-weight: 600;color: #fff;margin: 0px;">heading</p>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <div>
                                            <img src="/assets/smartediting/pageNine/page2.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <p style="font-size: 15px;font-weight: 400;color: #444444;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div class="card" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div class="card-header"
                                style="background-color: #EB785F;display: flex;align-items: center;">

                                <p style="font-size: 25px;font-weight: 600;color: #fff;margin: 0px;">heading</p>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <div>
                                            <img src="/assets/smartediting/pageNine/page2.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <p style="font-size: 15px;font-weight: 400;color: #444444;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 offset-lg-2 offset-xl-2 mt-4">
                        <div class="card" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div class="card-header"
                                style="background-color: #EB785F;display: flex;align-items: center;">

                                <p style="font-size: 25px;font-weight: 600;color: #fff;margin: 0px;">heading</p>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <div>
                                            <img src="/assets/smartediting/pageNine/page2.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <p style="font-size: 15px;font-weight: 400;color: #444444;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4 mt-4">
                        <div class="card" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div class="card-header"
                                style="background-color: #EB785F;display: flex;align-items: center;">

                                <p style="font-size: 25px;font-weight: 600;color: #fff;margin: 0px;">heading</p>
                            </div>
                            <div class="card-body">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                        <div>
                                            <img src="/assets/smartediting/pageNine/page2.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div>
                                            <p style="font-size: 15px;font-weight: 400;color: #444444;">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                                                molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
                                                fringilla
                                                accumsan, risus sem sollicitudin lacus, ut interdum tellus elit.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section style="margin-top: 80px;background-color: #F9F9F9;">
            <div style="padding: 20px;width: 90%;margin: 0 auto;">
                <div style="text-align: center;">
                    <p style="font-size: 25px;font-weight: 600;color: #EB785F;margin: 0px;">
                        Our Services
                    </p>
                    <p style="font-size: 50px;font-weight: 700;color: #444444;">
                        HEADING FOR THE SECTION
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="background-color: #fff;position: relative;">
                            <img src="/assets/smartediting/pageNine/page3.svg" alt="" class="w-100">
                            <div style="text-align: center;">
                                <p style="font-size: 30px;font-weight: 600;color: #444444;">
                                    Lorem ipsum dolor
                                </p>
                            </div>
                            <div
                                style="height: 100px;width: 100px;background-color: #EB785F;display: flex;justify-content: center;align-items: center;top: 0px;left: -10px;position: absolute;">
                                <img src="/assets/smartediting/pageNine/page4.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div style="padding: 20px;width: 90%;margin: 0 auto;">
                <div style="text-align: center;">
                    <p style="font-size: 25px;font-weight: 600;color: #EB785F;margin: 0px;">
                        Latest Reviews
                    </p>
                    <p style="font-size: 30px;font-weight: 700;color: #444444;">
                        CUSTOMER SAY ABOUT US
                    </p>
                </div>
                <div class="row" style="margin-top: 50px;">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="border-bottom-width: 7px;border-right-width: 7px;border-left-width: 7px;border-style: solid;border-top: none;
                    border-image: linear-gradient(to bottom, #fff 0%, #fff 30%, #eb795f1e 30%, #EB785F 100%) ;text-align: center;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 30px;border-image-slice: 1;">
                            <div
                                style="text-align: center;border: 5px solid #EB785F; height: 135px;width: 135px;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
                                <img src="/assets/smartediting/pageNine/page5.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageNine/page6.svg" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 30px;font-weight: 600;color: #444444;margin: 0px;">
                                        NAME HERE
                                    </p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageNine/page7.svg" alt="">
                                </div>
                            </div>
                            <div>
                                <p style="font-size: 20px;font-weight: 500;color: #444444;margin: 0px;">
                                    CEO, Agency
                                </p>
                            </div>
                            <div>
                                <p style="text-align: center;font-size: 16px;font-weight: 400;color: #000;">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad modi neque sed nesciunt
                                    sapiente, ab velit asperiores incidunt eaque, cumque esse, autem doloremque. A,
                                    fugit
                                    nostrum cumque laudantium assumenda iste.
                                </p>
                            </div>
                            <div style="padding-bottom: 20px;">
                                <img src="/assets/smartediting/pageNine/page8.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="border-bottom-width: 7px;border-right-width: 7px;border-left-width: 7px;border-style: solid;border-top: none;
                    border-image: linear-gradient(to bottom, #fff 0%, #fff 30%, #eb795f1e 30%, #EB785F 100%) 1;text-align: center;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 30px;">
                            <div
                                style="text-align: center;border: 5px solid #EB785F; height: 135px;width: 135px;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
                                <img src="/assets/smartediting/pageNine/page5.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageNine/page6.svg" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 30px;font-weight: 600;color: #444444;margin: 0px;">
                                        NAME HERE
                                    </p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageNine/page7.svg" alt="">
                                </div>
                            </div>
                            <div>
                                <p style="font-size: 20px;font-weight: 500;color: #444444;margin: 0px;">
                                    CEO, Agency
                                </p>
                            </div>
                            <div>
                                <p style="text-align: center;font-size: 16px;font-weight: 400;color: #000;">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad modi neque sed nesciunt
                                    sapiente, ab velit asperiores incidunt eaque, cumque esse, autem doloremque. A,
                                    fugit
                                    nostrum cumque laudantium assumenda iste.
                                </p>
                            </div>
                            <div style="padding-bottom: 20px;">
                                <img src="/assets/smartediting/pageNine/page8.svg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div
                            style="border-bottom-width: 7px;border-right-width: 7px;border-left-width: 7px;border-style: solid;border-top: none;
                    border-image: linear-gradient(to bottom, #fff 0%, #fff 30%, #eb795f1e 30%, #EB785F 100%) 1;text-align: center;display: flex;justify-content: center;flex-direction: column;align-items: center;border-radius: 30px;">
                            <div
                                style="text-align: center;border: 5px solid #EB785F; height: 135px;width: 135px;border-radius: 50%;display: flex;justify-content: center;align-items: center;">
                                <img src="/assets/smartediting/pageNine/page5.svg" alt="">
                            </div>
                            <div style="display: flex;gap: 20px;">
                                <div>
                                    <img src="/assets/smartediting/pageNine/page6.svg" alt="">
                                </div>
                                <div>
                                    <p style="font-size: 30px;font-weight: 600;color: #444444;margin: 0px;">
                                        NAME HERE
                                    </p>
                                </div>
                                <div>
                                    <img src="/assets/smartediting/pageNine/page7.svg" alt="">
                                </div>
                            </div>
                            <div>
                                <p style="font-size: 20px;font-weight: 500;color: #444444;margin: 0px;">
                                    CEO, Agency
                                </p>
                            </div>
                            <div>
                                <p style="text-align: center;font-size: 16px;font-weight: 400;color: #000;">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad modi neque sed nesciunt
                                    sapiente, ab velit asperiores incidunt eaque, cumque esse, autem doloremque. A,
                                    fugit
                                    nostrum cumque laudantium assumenda iste.
                                </p>
                            </div>
                            <div style="padding-bottom: 20px;">
                                <img src="/assets/smartediting/pageNine/page8.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    `,
  },
  {
    id: 10,
    type: "about",
    name: "About Us",
    thumbnail: "/assets/minisiteimages/smartediting/page10.png",
    html: `
        <div>
        <div>
            <img src="/assets/smartediting/pageTen/banner.png" alt="" style="width: 100%;">
        </div>
        <div style="margin-top: -6%;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-4">
                        <div style="border: 0.4px solid #B7B7B7;padding: 40px 30px;background-color: #fff;"
                            class="text-center">
                            <p style="font-size: 30px;font-weight: 600;color: #231F20;margin-bottom: 5px;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <div
                                style="position: absolute;bottom: -2px; border: 2px solid #D7282F;left: 50%;width: 40%;transform: translate(-50%,-50%);">

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-4">
                        <div style="border: 0.4px solid #B7B7B7;padding: 40px 30px;background-color: #fff;"
                            class="text-center">
                            <p style="font-size: 30px;font-weight: 600;color: #231F20;margin-bottom: 5px;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <div
                                style="position: absolute;bottom: -2px; border: 2px solid #D7282F;left: 50%;width: 40%;transform: translate(-50%,-50%);"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-4">
                        <div style="border: 0.4px solid #B7B7B7;padding: 40px 30px;background-color: #fff;"
                            class="text-center">
                            <p style="font-size: 30px;font-weight: 600;color: #231F20;margin-bottom: 5px;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <div
                                style="position: absolute;bottom: -2px; border: 2px solid #D7282F;left: 50%;width: 40%;transform: translate(-50%,-50%);"></div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-3 col-xl-3 mt-4">
                        <div style="border: 0.4px solid #B7B7B7;padding: 40px 30px;background-color: #fff;"
                            class="text-center">
                            <p style="font-size: 30px;font-weight: 600;color: #231F20;margin-bottom: 5px;">
                                00+
                            </p>
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet,
                            </p>
                            <div
                                style="position: absolute;bottom: -2px; border: 2px solid #D7282F;left: 50%;width: 40%;transform: translate(-50%,-50%);"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="background-color: #FFF4F4; padding: 50px 0px;margin-top: 50px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="text-center">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Maecenas eget <br> condimentum velit, sit amet feugiat lectus.
                        Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;z-index: 1;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">01</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">02</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">03</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">04</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">05</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-2 col-xl-2 "
                        style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
                        <div style="border: 2px solid #D7282F;padding: 30px;position: relative;width: 100%;overflow: hidden;"
                            class="text-center">
                            <img src="/assets/smartediting/pageTen/addicon.png" alt="">
                            <div style="position: absolute;height: 30px;width: 30px;background-color:#fff;left: -2px;top: -2px;"
                                class="text-center">
                                <p style="font-size: 18px;font-weight: 600;color: #000;margin-bottom: 0px;">06</p>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 20px;">
                            <p style="font-size: 18px;font-weight: 600;color: #000;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="text-center">
                    <p style="font-size: 30px;font-weight: 700;color: #231F20;">
                        Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit.
                    </p>
                    <p style="font-size: 13px;font-weight: 600;color: #4a4a4a;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Maecenas eget <br> condimentum velit, sit amet feugiat lectus.
                        Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent
                        auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                    </p>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-1.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-2.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-3.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-4.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-5.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 col-xl-4">
                        <div style="border: 1px solid #d7282f;padding: 10px;">
                            <img src="/assets/smartediting/pageTen/col3-6.png" alt="" class="w-100">
                        </div>
                        <div class="text-center mt-3">
                            <p style="font-size: 18px;font-weight: 600;color: #231F20;">
                                Lorem ipsum dolor sit amet, <br> consectetur adipiscing elit.
                            </p>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 30px;padding: 40px 0px;background-color: #F6F6F6;">
            <div style="width: 90%;margin: 0 auto;">
                <div class="row">
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div style="border-right: 1px solid red;">
                            <p style="font-size: 30px;font-weight: 700;color: #231F20;margin:0px">
                                Lorem ipsum dolor sit amet, consectetur <br> adipiscing elit.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-6 col-xl-6">
                        <div>
                            <p style="font-size: 13px;font-weight: 400;color: #4a4a4a;margin:0px">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                                dictum
                                est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem
                                sollicitudin
                                lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
                                feugiat
                                lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                                himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-7 col-xl-7">
                        <div style="height: 100%;">
                            <div class="row">
                                <div class="col-sm-12 col-lg-5 col-xl-5 mt-4">
                                    <div style="height: 100%;">
                                        <div>
                                            <img src="/assets/smartediting/pageTen/sec4img1.png" alt="" class="w-100">
                                        </div>
                                        <div style="margin-top: 20px;">
                                            <img src="/assets/smartediting/pageTen/sec4img2.png" alt="" class="w-100">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-lg-7 col-xl-7  mt-4">
                                    <div style="height: 100%;">
                                        <img src="/assets/smartediting/pageTen/sec4img3.png" alt="" class="w-100">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-lg-5 col-xl-5 mt-4">
                        <div style="height: 100%;">
                            <div>
                                <img src="/assets/smartediting/pageTen/sec4img4.png" alt="" class="w-100">
                            </div>
                            <div style="margin-top: 20px;">
                                <img src="/assets/smartediting/pageTen/sec4img5.png" alt="" class="w-100">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  },
];
