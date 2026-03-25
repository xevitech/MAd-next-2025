import { Template } from "@/hooks/Interface";
import smarteditmodule from "components/products/editProduct/SmartEditing/style.module.css";
const assetPrefix =
  process.env.NODE_ENV === "production"
    ? "https://www.merchantad.com//"
    : "https://www.merchantad.com//";
// import './style.css';
const domainName = "https://www.merchantad.com/";

export const MiniTemplate: Template[] = [
  {
    id: 1,
    type: "review",
    name: "Reviews",
    thumbnail: "/assets/minisiteimages/smarteditingblocks/block1/thumbnail.png",
    html: `
    <div>
        <div class="row m-0">
            <div class="col-12">
                <div class="text-center">
                    <p style="font-size: 54px;font-weight: 700;color: #000;">
                        Reviews from <span style="color: #d7282f;"><em>Our Clients</em></span>
                    </p>
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum <br>
                        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin <br>
                        lacus, ut interdum tellus elit sed risus
                    </p>
                </div>
            </div>
        </div>
        <div class="row m-0">
            <div class="col-3">
                <div
                    style="border: 1px solid #d7282f;border-top-left-radius: 30px;border-bottom-right-radius: 60px;padding: 20px;">
                    <p style="font-size: 32px;font-weight: 600;color: #000;">
                        Nice People
                    </p>
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
                    </p>
                </div>
                <div style="margin: 20px 0px 0px 20px; display: flex;gap: 15px;">
                    <div
                        style="display: flex;justify-content: center;align-items: center;height: 65px;width: 65px;border-radius: 50px;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block1/four2.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;color: #000;margin-bottom: 0px;">
                            Client Name
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #000;">
                            Company Name
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div
                    style="border: 1px solid #d7282f;border-top-left-radius: 30px;border-bottom-right-radius: 60px;padding: 20px;">
                    <p style="font-size: 32px;font-weight: 600;color: #000;">
                        Nice People
                    </p>
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
                    </p>
                </div>
                <div style="margin: 20px 0px 0px 20px; display: flex;gap: 15px;">
                    <div
                        style="display: flex;justify-content: center;align-items: center;height: 65px;width: 65px;border-radius: 50px;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block1/four2.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;color: #000;margin-bottom: 0px;">
                            Client Name
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #000;">
                            Company Name
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div
                    style="border: 1px solid #d7282f;border-top-left-radius: 30px;border-bottom-right-radius: 60px;padding: 20px;">
                    <p style="font-size: 32px;font-weight: 600;color: #000;">
                        Nice People
                    </p>
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
                    </p>
                </div>
                <div style="margin: 20px 0px 0px 20px; display: flex;gap: 15px;">
                    <div
                        style="display: flex;justify-content: center;align-items: center;height: 65px;width: 65px;border-radius: 50px;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block1/four2.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;color: #000;margin-bottom: 0px;">
                            Client Name
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #000;">
                            Company Name
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div
                    style="border: 1px solid #d7282f;border-top-left-radius: 30px;border-bottom-right-radius: 60px;padding: 20px;">
                    <p style="font-size: 32px;font-weight: 600;color: #000;">
                        Nice People
                    </p>
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                        est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.
                    </p>
                </div>
                <div style="margin: 20px 0px 0px 20px; display: flex;gap: 15px;">
                    <div
                        style="display: flex;justify-content: center;align-items: center;height: 65px;width: 65px;border-radius: 50px;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block1/four2.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;color: #000;margin-bottom: 0px;">
                            Client Name
                        </p>
                        <p style="font-size: 13px;font-weight: 400;color: #000;">
                            Company Name
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  },
  {
    id: 2,
    type: "review",
    name: "Reviews",
    thumbnail: "/assets/minisiteimages/smarteditingblocks/block2/thumbnail.png",
    html: `    
     <div>
        <div class="row m-0">
            <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <div>
                    <p style="font-size: 70px;font-weight: 700;color: #212121;margin-bottom: 0px;">
                        About Us
                    </p>
                    <div style="width: 230px;background-color: #d7282f;height: 3px;"></div>
                </div>
                <div style="margin-top: 10px;">
                    <p style="font-size: 15px;font-weight: 400;color: #000;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. tiam
                        eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,
                        risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum
                        velit, sit amet feugiat lectus.
                    </p>
                </div>
                <div>
                    <button
                        style="background: linear-gradient(89deg, #d7282f 0.01%, #eb989a 100%);color: #fff;padding: 12px 17px;border-radius: 15px;text-transform: uppercase;border: transparent;font-size: 16px;font-weight: 600;">our
                        history</button>
                </div>
            </div>
            <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div>
                    <img src="/assets/minisiteimages/smarteditingblocks/block2/three2.svg" alt="" class="img-fluid">
                </div>
            </div>
        </div>

        <div class="row m-0 mt-5">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div style="display: flex;gap: 20px;">
                    <div>
                        <img src="/assets/minisiteimages/smarteditingblocks/block2/three3.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;margin-bottom: 0px;">
                            Automotive parts and systems
                        </p>
                        <p>
                            Bring to the table win-win survival strategies to ensure the proactive domination.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div style="display: flex;gap: 20px;">
                    <div>
                        <img src="/assets/minisiteimages/smarteditingblocks/block2/three4.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;margin-bottom: 0px;">
                            Maintenance services
                        </p>
                        <p>
                            Maintenance Workers keep machines running smoothly. They paint floors, fix plumbing issues
                            and sinks.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                <div style="display: flex;gap: 20px;">
                    <div>
                        <img src="/assets/minisiteimages/smarteditingblocks/block2/three5.svg" alt="">
                    </div>
                    <div>
                        <p style="font-size: 20px;font-weight: 600;margin-bottom: 0px;">
                            Maintenance services
                        </p>
                        <p>
                            Capitalise on low hanging fruit to identify a premium ballpark.

                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row m-0 my-5">
            <div class="col-3">
                <div class="text-center"
                    style="display: flex;justify-content: center;flex-direction: column;border-right: 2px solid #B6B6B6;">
                    <p style="font-size: 46px;font-weight: 700;color: #212121;margin-bottom: 0px;">1996</p>
                    <p style="font-size: 16px;font-weight: 400px;color: #d7282f;font-weight:500">Established In</p>
                </div>
            </div>
            <div class="col-2">
                <div class="text-center"
                    style="display: flex;justify-content: center;flex-direction: column;border-right: 2px solid #B6B6B6;">
                    <p style="font-size: 46px;font-weight: 700;color: #212121;margin-bottom: 0px;">189</p>
                    <p style="font-size: 16px;font-weight: 400px;color: #d7282f;font-weight:500">Employees</p>
                </div>
            </div>
            <div class="col-2">
                <div class="text-center"
                    style="display: flex;justify-content: center;flex-direction: column;border-right: 2px solid #B6B6B6;">
                    <p style="font-size: 46px;font-weight: 700;color: #212121;margin-bottom: 0px;">8</p>
                    <p style="font-size: 16px;font-weight: 400px;color: #d7282f;font-weight:500">Branches</p>
                </div>
            </div>
            <div class="col-2">
                <div class="text-center"
                    style="display: flex;justify-content: center;flex-direction: column;border-right: 2px solid #B6B6B6;">
                    <p style="font-size: 46px;font-weight: 700;color: #212121;margin-bottom: 0px;">44</p>
                    <p style="font-size: 16px;font-weight: 400px;color: #d7282f;font-weight:500">Projects</p>
                </div>
            </div>
            <div class="col-3">
                <div class="text-center"
                    style="display: flex;justify-content: center;flex-direction: column;">
                    <p style="font-size: 46px;font-weight: 700;color: #212121;margin-bottom: 0px;">30M $</p>
                    <p style="font-size: 16px;font-weight: 400px;color: #d7282f;font-weight:500">Annual Turnover</p>
                </div>
            </div>
        </div>
    </div>`,
  },
  {
    id: 3,
    type: "review",
    name: "Reviews",
    thumbnail: "/assets/minisiteimages/smarteditingblocks/block3/thumbnail.png",
    html: `
    <div class="row m-0">
        <div class="col-12 mb-5">
            <div style="text-align: center;">
                <p style="font-size: 30px;font-weight:600 ;color: #000;">
                    Our Clients <span style="color: #d7282f;font-size: 45px;">Reviews</span>
                </p>
            </div>
        </div>
        <div class="col-4 mt-5">
            <div
                style="position: relative;padding: 30px;background-color: #231f20;color: #fff;border-radius: 0 0 6px 6px;">
                <div style="position: absolute;top: -10px;
                left: 50%;transform: translate(-50%, -50%)">
                    <img src="/assets/minisiteimages/smarteditingblocks/block3/seven1.png" alt="" style="width: 130px;height: 130px;">
                </div>
                <div style="margin-top: 50px;text-align: center;">
                    <p style="font-size: 36px;font-weight: 600;color: #fff;">
                        Elizabeth/<span style="font-size: 20px;font-weight: 600;color: #fff;">CEO,Compamy Name</span>
                    </p>
                </div>
                <div style="text-align: center;">
                    <p>
                        stars
                    </p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 16px;font-weight: 700;color: #fff;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit
                    </p>
                </div>
                <div
                    style="position: absolute;bottom: -30px;height: 20px;width: 80%;background-color: #d7282f;left: 50%;transform: translate(-50%, -50%);border-radius: 0 0 6px 6px;">

                </div>
            </div>
        </div>
        <div class="col-4 mt-5">
            <div
                style="position: relative;padding: 30px;background-color: #231f20;color: #fff;border-radius: 0 0 6px 6px;">
                <div style="position: absolute;top: -10px;
                left: 50%;transform: translate(-50%, -50%)">
                    <img src="/assets/minisiteimages/smarteditingblocks/block3/seven1.png" alt="" style="width: 130px;height: 130px;">
                </div>
                <div style="margin-top: 50px;text-align: center;">
                    <p style="font-size: 36px;font-weight: 600;color: #fff;">
                        Elizabeth/<span style="font-size: 20px;font-weight: 600;color: #fff;">CEO,Compamy Name</span>
                    </p>
                </div>
                <div style="text-align: center;">
                    <p>
                        stars
                    </p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 16px;font-weight: 700;color: #fff;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit
                    </p>
                </div>
                <div
                    style="position: absolute;bottom: -30px;height: 20px;width: 80%;background-color: #d7282f;left: 50%;transform: translate(-50%, -50%);border-radius: 0 0 6px 6px;">

                </div>
            </div>
        </div>
        <div class="col-4 mt-5">
            <div
                style="position: relative;padding: 30px;background-color: #231f20;color: #fff;border-radius: 0 0 6px 6px;">
                <div style="position: absolute;top: -10px;
                left: 50%;transform: translate(-50%, -50%)">
                    <img src="/assets/minisiteimages/smarteditingblocks/block3/seven1.png" alt="" style="width: 130px;height: 130px;">
                </div>
                <div style="margin-top: 50px;text-align: center;">
                    <p style="font-size: 36px;font-weight: 600;color: #fff;">
                        Elizabeth/<span style="font-size: 20px;font-weight: 600;color: #fff;">CEO,Compamy Name</span>
                    </p>
                </div>
                <div style="text-align: center;">
                    <p>
                        stars
                    </p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 16px;font-weight: 700;color: #fff;">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a,
                        mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                        interdum tellus elit
                    </p>
                </div>
                <div
                    style="position: absolute;bottom: -30px;height: 20px;width: 80%;background-color: #d7282f;left: 50%;transform: translate(-50%, -50%);border-radius: 0 0 6px 6px;">

                </div>
            </div>
        </div>
    </div>
    `,
  },
  {
    id: 4,
    type: "review",
    name: "Reviews",
    thumbnail: "/assets/minisiteimages/smarteditingblocks/block4/thumbnail.png",
    html: `
    <div>
        <div class="row m-0">
            <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                <div style="border: 1px solid;border-radius: 20px;border-color: #363636;">
                    <div style="border-bottom: 1px solid #363636;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block4/default.svg" alt="" class="w-100"
                            style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
                    </div>
                    <div style="font-size: 32px;font-weight: 600;text-align: center;">
                        <p>
                            Heading
                        </p>
                    </div>
                    <div style="font-size: 14px;font-weight: 400;text-align: center;padding:0px 20px 20px 20px">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                <div style="border: 1px solid;border-radius: 20px;border-color: #363636;">
                    <div style="border-bottom: 1px solid #363636;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block4/default.svg" alt="" class="w-100"
                            style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
                    </div>
                    <div style="font-size: 32px;font-weight: 600;text-align: center;">
                        <p>
                            Heading
                        </p>
                    </div>
                    <div style="font-size: 14px;font-weight: 400;text-align: center;padding:0px 20px 20px 20px">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                <div style="border: 1px solid;border-radius: 20px;border-color: #363636;">
                    <div style="border-bottom: 1px solid #363636;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block4/default.svg" alt="" class="w-100"
                            style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
                    </div>
                    <div style="font-size: 32px;font-weight: 600;text-align: center;">
                        <p>
                            Heading
                        </p>
                    </div>
                    <div style="font-size: 14px;font-weight: 400;text-align: center;padding:0px 20px 20px 20px">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-3 col-xl-3 mt-3">
                <div style="border: 1px solid;border-radius: 20px;border-color: #363636;">
                    <div style="border-bottom: 1px solid #363636;">
                        <img src="/assets/minisiteimages/smarteditingblocks/block4/default.svg" alt="" class="w-100"
                            style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
                    </div>
                    <div style="font-size: 32px;font-weight: 600;text-align: center;">
                        <p>
                            Heading
                        </p>
                    </div>
                    <div style="font-size: 14px;font-weight: 400;text-align: center;padding:0px 20px 20px 20px">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                            est a,
                            mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                            interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                            Class
                            aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  },
];
