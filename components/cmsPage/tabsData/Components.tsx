// export const ImagewithRightText = (editor) => {
//   editor.BlockManager.add("image-with-right-text", {
//     label: "Image with Right Text",
//     attributes: {
//       class: "h-25 d-inline-block",
//     },
//     media:
//       '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14 7v1H2V7h12zm0-4v1H2V3h12zm0 8v1H2v-1h12zm0-4v1H2V7h12z"/></svg>',
//     content: `<div class="marketing">
//       <hr class="featurette-divider"/>
//       <div class="row featurette">
//           <div class="col-md-7 order-md-2">
//               <h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for
//                       yourself.</span></h2>
//               <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how
//                   this layout would work with some actual real-world content in place.</p>
//           </div>
//           <div class="col-md-5 order-md-1">
//              <img src="placeholder.png" alt="" width="580" height="500"/>
//           </div>
//       </div>
//       <hr class="featurette-divider"/>
//   </div>`,
//   });
// };
// export const ImagesWithTextPlugin = (editor) => {
//   editor.BlockManager.add("my-first-block", {
//     label: "Image with Text",
//     media:
//       '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14 7v1H2V7h12zm0-4v1H2V3h12zm0 8v1H2v-1h12zm0-4v1H2V7h12z"/></svg>',
//     attributes: {
//       class: "h-25 d-inline-block",
//     },
//     content: ` <div className="marketing">
//       <hr className="featurette-divider" />
//       <div className="row featurette">
//         <div className="col-md-7 order-md-2">
//           <h2 className="featurette-heading">
//             Oh yeah, it's that good.{" "}
//             <span className="text-muted">See for yourself.</span>
//           </h2>
//           <p className="lead">
//             Another featurette? Of course. More placeholder content here to
//             give you an idea of how this layout would work with some actual
//             real-world content in place.
//           </p>
//         </div>
//         <div className="col-md-5 order-md-1">
//           <img
//             src="/assets/placeholder.png"
//             alt=""
//             width="580"
//             height="500"
//           />
//         </div>
//       </div>
//       <hr className="featurette-divider" />
//     </div>`,
//   });
// };
export const JumboTronPlugin = (editor) => {
  editor.BlockManager.add("jumbo-tron", {
    label: "Jumbo Tron",
    category: "Text Selection",
    media: `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.3427 9.30514C32.7987 9.30514 34.1742 9.34177 38.6303 9.34177C39.139 9.34177 39.6273 9.38653 40.0994 9.47606C40.5674 9.56559 41.0191 9.69581 41.4382 9.87487C41.8615 10.0539 42.2725 10.2777 42.6672 10.5423C43.0579 10.8068 43.4282 11.1161 43.7782 11.462C44.1282 11.8119 44.4374 12.1863 44.6979 12.5729C44.9665 12.9677 45.1903 13.3787 45.3653 13.8019C45.5403 14.2251 45.6746 14.6728 45.7641 15.1408C45.8536 15.6128 45.8984 16.1012 45.8984 16.6099V31.3576C45.8984 31.8663 45.8536 32.3547 45.7641 32.8267C45.6746 33.2988 45.5403 33.7464 45.3653 34.1656C45.1862 34.5929 44.9624 35.0039 44.6979 35.3946C44.4334 35.7852 44.1241 36.1555 43.7782 36.5055L43.7741 36.5096C43.4119 36.8636 43.0335 37.1729 42.6428 37.4334C42.2521 37.6979 41.8411 37.9176 41.4179 38.0967C40.9947 38.2717 40.5511 38.406 40.0831 38.4955C39.6192 38.585 39.1308 38.6298 38.6262 38.6298H33.0592C32.8842 38.6298 32.7133 38.6705 32.5546 38.7478C32.4081 38.8211 32.2738 38.9269 32.172 39.0652L32.1639 39.0734C31.7244 39.6553 31.2646 40.221 30.7803 40.7663C30.296 41.3075 29.7914 41.8325 29.2502 42.3289C28.7252 42.8173 28.1717 43.2853 27.598 43.737C27.0242 44.1887 26.43 44.6119 25.8237 45.0107C25.2417 45.3933 24.6272 45.7595 23.9883 46.1054C23.3576 46.4473 22.7105 46.7647 22.0513 47.0577C21.978 47.0902 21.8966 47.0862 21.8234 47.0455C21.7013 46.9763 21.6565 46.8176 21.7257 46.6955C21.8437 46.4879 21.9577 46.2804 22.0716 46.0607C22.1815 45.8572 22.2791 45.6496 22.3768 45.4299C22.564 45.0107 22.7431 44.5834 22.914 44.1439C23.089 43.7004 23.2518 43.2568 23.4105 42.7969C23.561 42.3696 23.6994 41.9261 23.8337 41.4784C23.968 41.0308 24.0941 40.5791 24.2162 40.1274C24.2488 39.9931 24.2813 39.8588 24.2813 39.7204C24.2813 39.4193 24.1592 39.1385 23.9598 38.9391L23.9476 38.9269C23.7442 38.7234 23.4593 38.5932 23.1541 38.5932H16.6836C16.1749 38.5932 15.6907 38.5484 15.2267 38.4589C14.7669 38.3693 14.3274 38.2391 13.9082 38.0641L13.9001 38.0601C13.485 37.8973 13.0821 37.6775 12.6955 37.4171C12.2967 37.1485 11.9101 36.827 11.5398 36.4689L11.5357 36.4648C11.1858 36.1149 10.8765 35.7445 10.612 35.3539C10.3434 34.9591 10.1236 34.5522 9.94456 34.1249C9.76958 33.7017 9.63528 33.254 9.54575 32.786C9.45623 32.314 9.41146 31.8256 9.41146 31.3169V28.3177C9.41146 26.812 7.46218 26.7998 7.13662 27.8742V31.2966C7.13662 31.9396 7.19767 32.5663 7.31161 33.1686C7.42963 33.783 7.60461 34.3772 7.83657 34.9551C8.06446 35.5126 8.3534 36.0497 8.70337 36.5666C9.05335 37.0793 9.46029 37.5717 9.92422 38.0356C10.3841 38.4996 10.8765 38.9065 11.3933 39.2565C11.902 39.6024 12.4392 39.8913 12.9967 40.1192L13.0048 40.1233C13.5786 40.3552 14.1768 40.5302 14.7872 40.6483C15.3895 40.7622 16.0162 40.8232 16.6592 40.8232H21.3106C21.3391 40.8232 21.3717 40.8273 21.4001 40.8354C21.5344 40.8802 21.6077 41.0226 21.567 41.1569L21.5629 41.1651C21.4734 41.4499 21.3839 41.7348 21.2821 42.04L21.2781 42.0563C21.1356 42.4673 20.9769 42.8865 20.8101 43.3056C20.6514 43.7004 20.4886 44.091 20.3177 44.4654C20.3136 44.4858 20.3095 44.502 20.3014 44.5224C20.1345 44.9009 19.9433 45.2752 19.7194 45.6456C19.4997 46.0159 19.2515 46.3781 18.9829 46.7362C18.7061 47.0943 18.3969 47.4565 18.055 47.8227L18.0428 47.839C17.6969 48.2053 17.3225 48.5675 16.9196 48.9174C16.6877 49.125 16.5615 49.4098 16.5453 49.6947C16.529 49.9796 16.6226 50.2726 16.8301 50.5045C16.9766 50.6673 17.1557 50.7772 17.351 50.8341C17.5463 50.8911 17.758 50.8993 17.9574 50.8423C18.8038 50.6144 19.634 50.3662 20.4397 50.0894C21.2455 49.8127 22.0268 49.5116 22.7756 49.186C23.5325 48.8605 24.2732 48.5023 24.9894 48.1157C25.7016 47.7332 26.3934 47.3181 27.0608 46.8786C27.7241 46.4473 28.3671 45.9874 28.9897 45.4991C29.6123 45.0107 30.2106 44.498 30.7844 43.9649L30.7966 43.9527C31.2808 43.4969 31.7488 43.0167 32.2046 42.5202C32.6645 42.0156 33.108 41.4947 33.5231 40.9657C33.5679 40.8965 33.6493 40.8477 33.7388 40.8477H38.6303C39.2855 40.8477 39.9122 40.7866 40.5185 40.6727C41.129 40.5547 41.715 40.3797 42.2766 40.1518L42.2847 40.1477C42.8503 39.9076 43.3875 39.6146 43.9043 39.2687C44.4171 38.9228 44.9054 38.524 45.3694 38.0601C45.8333 37.5961 46.2402 37.1037 46.5902 36.591C46.9361 36.0782 47.2291 35.537 47.457 34.9795C47.689 34.4138 47.8639 33.8237 47.982 33.2092C48.0959 32.607 48.1569 31.9762 48.1569 31.321V16.5732C48.1569 15.918 48.0959 15.2873 47.982 14.685C47.8639 14.0705 47.689 13.4804 47.457 12.9188C47.2291 12.3613 46.9361 11.8201 46.5902 11.3073C46.2402 10.7905 45.8333 10.2981 45.3734 9.83824C44.9095 9.37432 44.4212 8.96738 43.9043 8.6174C43.3957 8.2715 42.8585 7.98256 42.301 7.75467L42.2928 7.7506C41.715 7.51864 41.1208 7.34366 40.5063 7.22564C39.904 7.1117 39.2773 7.05065 38.6344 7.05065C34.0033 7.05065 32.4528 7.03031 27.8218 7.03031C26.7189 7.35179 26.6457 9.30514 28.3427 9.30514ZM19.2311 32.0291C18.641 32.0372 18.1608 31.5652 18.1527 30.9751C18.1446 30.385 18.6166 29.9048 19.2067 29.8967L30.5117 29.7258L32.6767 29.5874C33.2667 29.5508 33.7713 29.9984 33.808 30.5844C33.8446 31.1745 33.397 31.6791 32.811 31.7157L30.646 31.8541C30.646 31.8541 20.1834 32.0128 19.2311 32.0291ZM22.6169 25.3307C22.0268 25.3307 21.5466 24.8505 21.5466 24.2605C21.5466 23.6704 22.0268 23.1902 22.6169 23.1902H37.8856C38.4757 23.1902 38.9559 23.6704 38.9559 24.2605C38.9559 24.8505 38.4757 25.3307 37.8856 25.3307H22.6169ZM27.3701 18.9417C26.78 18.9417 26.2998 18.4615 26.2998 17.8714C26.2998 17.2813 26.78 16.8011 27.3701 16.8011H37.8856C38.4757 16.8011 38.9559 17.2813 38.9559 17.8714C38.9559 18.4615 38.4757 18.9417 37.8856 18.9417H27.3701ZM11.613 1.08887L14.5227 8.19418L22.1815 8.7639C22.3687 8.77611 22.5111 8.93889 22.4989 9.13016C22.4908 9.22782 22.4419 9.31328 22.3727 9.37432L16.5168 14.3309L18.3399 21.7944C18.3847 21.9775 18.2707 22.1606 18.0876 22.2054C17.9899 22.2298 17.8963 22.2095 17.819 22.1565L11.2956 18.1196L4.76412 22.1606C4.60541 22.2583 4.3938 22.2095 4.29613 22.0507C4.2473 21.9694 4.23509 21.8758 4.25543 21.7903L6.07856 14.3269L0.218514 9.37026C0.0760822 9.24817 0.0557348 9.03249 0.177819 8.89006C0.238861 8.81681 0.32432 8.77611 0.413849 8.76797L8.0726 8.19825L10.9823 1.09294C11.0515 0.917953 11.2509 0.836563 11.4259 0.905744C11.5154 0.9383 11.5805 1.00748 11.613 1.08887Z" fill="white"/>
    </svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Text Selection",
    content: `<div>
      <h2>Heading</h2>
      <p>Will you do the same for me? It's time to face the music I'm no longer your muse. Heard it's
          beautiful, be the judge and my girls gonna take a vote. I can feel a phoenix inside of me. Heaven is
          jealous of our love, angels are crying from up above. Yeah, you take me to utopia.</p>
      <p><a class="btn btn-secondary" href="#" role="button">View details »</a></p>
  </div>`,
  });
};
export const PortfolioPlugin = (editor) => {
  editor.BlockManager.add("portfilio", {
    label: "Portfolio",
    category: "Text Selection",
    attributes: {
      class: "h-25 d-inline-block fa fa-tasks",
    },
    Category: "Text Selection",
    content: `<div class="card" style="width: 18rem;">
      <img src="placeholder.png" class="card-img-top" alt="..." height="auto" width="100%">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
          card's content.
        </p>
        <a href="#" role="button" aria-pressed="true">Primary link</a>
      </div>
    </div>`,
  });
};
export const PhotoGallery = (editor) => {
  editor.BlockManager.add("photo-gallery", {
    label: "Photo Gallery",
    category: "Photo",
    media: `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.83057 17.918C8.70166 17.918 8.57275 17.8535 8.5083 17.7891L5.479 14.6953L3.4165 16.7578C3.22314 16.9512 2.96533 16.9512 2.77197 16.7578C2.57861 16.5645 2.57861 16.3066 2.77197 16.1133L5.15674 13.7285C5.22119 13.6641 5.3501 13.5996 5.479 13.5996C5.60791 13.5996 5.73682 13.6641 5.80127 13.7285L9.15283 17.1445C9.34619 17.3379 9.34619 17.5957 9.15283 17.7891C9.08838 17.8535 8.95947 17.918 8.83057 17.918Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.313 16.2422C10.1841 16.2422 10.0552 16.1777 9.92632 16.0488L8.95952 14.6309L7.28374 15.9199C7.09038 16.1133 6.83257 16.0488 6.70366 15.8555C6.5103 15.6621 6.57476 15.4043 6.76812 15.2754L8.76616 13.6641C8.83062 13.5352 8.95952 13.5352 9.08843 13.5352C9.21733 13.5352 9.34624 13.5996 9.41069 13.7285L10.6998 15.5332C10.8287 15.7266 10.7642 15.9844 10.5708 16.1777C10.5064 16.2422 10.3775 16.2422 10.313 16.2422Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M28.4888 17.918C28.3599 17.918 28.231 17.8535 28.1665 17.7891L25.1372 14.6953L23.0747 16.7578C22.8813 16.9512 22.6235 16.9512 22.4302 16.7578C22.2368 16.5645 22.2368 16.3066 22.4302 16.1133L24.8149 13.7285C24.8794 13.6641 25.0083 13.5996 25.1372 13.5996C25.2661 13.5996 25.395 13.6641 25.4595 13.7285L28.811 17.1445C29.0044 17.3379 29.0044 17.5957 28.811 17.7891C28.7466 17.8535 28.6177 17.918 28.4888 17.918Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.9712 16.2422C29.8423 16.2422 29.7134 16.1777 29.5845 16.0488L28.6177 14.6309L26.9419 15.9199C26.7486 16.1133 26.4908 16.0488 26.3619 15.8555C26.1685 15.6621 26.233 15.4043 26.4263 15.2754L28.4244 13.6641C28.4888 13.5352 28.6177 13.5352 28.7466 13.5352C28.8755 13.5352 29.0044 13.5996 29.0689 13.7285L30.358 15.5332C30.4869 15.7266 30.4224 15.9844 30.2291 16.1777C30.1646 16.2422 30.0357 16.2422 29.9712 16.2422Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5944 17.4024C19.4655 17.4024 19.3366 17.3379 19.2721 17.209L16.694 14.1797L13.2135 16.5C13.0202 16.6289 12.6979 16.5645 12.569 16.3711C12.4401 16.1777 12.5046 15.8555 12.6979 15.7266L16.5007 13.2129C16.694 13.084 16.9518 13.1485 17.0807 13.2774L19.9167 16.6289C20.11 16.8223 20.0456 17.1445 19.9167 17.2734C19.7878 17.4024 19.7233 17.4024 19.5944 17.4024Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.70361 25.946C6.51025 25.946 6.31689 25.8171 6.25244 25.6237L5.28564 22.8522L3.4165 24.7858C3.22314 24.9792 2.96533 24.9792 2.77197 24.7858C2.57861 24.5925 2.57861 24.3347 2.77197 24.1413L5.15674 21.6921C5.28564 21.5632 5.41455 21.5632 5.60791 21.5632C5.73682 21.6276 5.86572 21.6921 5.93018 21.8854L7.15479 25.3659C7.21924 25.5593 7.09033 25.8171 6.83252 25.946C6.83252 25.946 6.76807 25.946 6.70361 25.946Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.18799 24.4636C6.05908 24.4636 5.93018 24.3991 5.86572 24.3347C5.67236 24.1413 5.67236 23.8835 5.86572 23.6901L7.99268 21.6921C8.18604 21.4987 8.44385 21.4987 8.63721 21.6921L10.6353 23.4323C10.8286 23.5612 10.8286 23.8835 10.6353 24.0768C10.5063 24.2057 10.1841 24.2702 9.99072 24.0768L8.31494 22.5944L6.51025 24.3347C6.38135 24.3991 6.31689 24.4636 6.18799 24.4636Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.9712 24.0124C29.8423 24.0124 29.7779 24.0124 29.7134 23.8835L26.3619 21.1765L23.0103 23.819C22.8169 23.9479 22.5591 23.8835 22.4302 23.6901C22.2369 23.4968 22.3013 23.239 22.4947 23.11L26.1041 20.2741C26.233 20.1452 26.4908 20.1452 26.6841 20.2741L30.2935 23.239C30.4869 23.3679 30.4869 23.6901 30.358 23.8835C30.2291 23.9479 30.1001 24.0124 29.9712 24.0124Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.6269 25.4304C18.498 25.4304 18.4336 25.3659 18.3047 25.3015L15.2754 22.6589L13.2773 24.3991C13.0839 24.5925 12.7617 24.5925 12.6328 24.3991C12.4394 24.2057 12.5039 23.8835 12.6328 23.7546L14.9531 21.7565C15.1465 21.6276 15.4043 21.6276 15.5976 21.7565L18.9492 24.6569C19.0781 24.7858 19.1425 25.1081 18.9492 25.3015C18.8847 25.3659 18.7558 25.4304 18.6269 25.4304Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.0454 23.9479C19.9165 23.9479 19.7231 23.8835 19.6587 23.6901L18.563 21.7565L16.7583 23.3679C16.5649 23.5612 16.2427 23.4968 16.1138 23.3679C15.9204 23.1745 15.9204 22.8522 16.1138 22.7233L18.3696 20.7253C18.4985 20.5964 18.6274 20.5964 18.7563 20.5964C18.8853 20.5964 19.0142 20.7253 19.0786 20.7897L20.4321 23.239C20.561 23.4968 20.4966 23.7546 20.2388 23.8835C20.1743 23.9479 20.1099 23.9479 20.0454 23.9479Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.79688 17.918H3.60938C3.0293 17.918 2.64258 17.5312 2.64258 16.9512V11.666C2.64258 11.0859 3.0293 10.6992 3.60938 10.6992H9.79688C10.3125 10.6992 10.7637 11.1504 10.7637 11.666V16.9512C10.7637 17.4668 10.3125 17.918 9.79688 17.918ZM3.54492 17.0156H3.60938H9.79688C9.79688 17.0156 9.86133 17.0156 9.86133 16.9512V11.666C9.86133 11.6016 9.79688 11.6016 9.79688 11.6016H3.60938H3.54492V11.666V16.9512V17.0156Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.4551 17.918H23.2676C22.6875 17.918 22.3008 17.5312 22.3008 16.9512V11.666C22.3008 11.0859 22.6875 10.6992 23.2676 10.6992H29.4551C29.9707 10.6992 30.4219 11.1504 30.4219 11.666V16.9512C30.4219 17.4668 29.9707 17.918 29.4551 17.918ZM23.2031 17.0156H23.2676H29.4551C29.4551 17.0156 29.5195 17.0156 29.5195 16.9512V11.666C29.5195 11.6016 29.4551 11.6016 29.4551 11.6016H23.2676H23.2031V11.666V16.9512V17.0156Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5938 17.4023H13.4062C12.8906 17.4023 12.5039 17.0156 12.5039 16.5645V12.0527C12.5039 11.6016 12.8906 11.2148 13.4062 11.2148H19.5938C20.1094 11.2148 20.4961 11.6016 20.4961 12.0527V16.5645C20.4961 17.0156 20.1094 17.4023 19.5938 17.4023ZM13.4062 16.5H19.5938V12.1172H13.4062V16.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.79688 25.946H3.60938C3.09375 25.946 2.64258 25.4948 2.64258 24.9792V19.6296C2.64258 19.114 3.09375 18.6628 3.60938 18.6628H9.79688C10.3125 18.6628 10.7637 19.114 10.7637 19.6296V24.9792C10.7637 25.4948 10.3125 25.946 9.79688 25.946ZM3.60938 19.5651C3.54492 19.5651 3.54492 19.6296 3.54492 19.6296V24.9792C3.54492 24.9792 3.54492 25.0436 3.60938 25.0436H9.79688L9.86133 24.9792V19.6296L9.79688 19.5651H3.60938Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.4551 25.946H23.2676C22.752 25.946 22.3008 25.4948 22.3008 24.9792V19.6296C22.3008 19.114 22.752 18.6628 23.2676 18.6628H29.4551C29.9707 18.6628 30.4219 19.114 30.4219 19.6296V24.9792C30.4219 25.4948 29.9707 25.946 29.4551 25.946ZM23.2676 19.5651C23.2031 19.5651 23.2031 19.6296 23.2031 19.6296V24.9792C23.2031 24.9792 23.2031 25.0436 23.2676 25.0436H29.4551L29.5195 24.9792V19.6296L29.4551 19.5651H23.2676Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5938 25.4304H13.4062C12.8906 25.4304 12.5039 25.0436 12.5039 24.528V20.0807C12.5039 19.5651 12.8906 19.1784 13.4062 19.1784H19.5938C20.1094 19.1784 20.4961 19.5651 20.4961 20.0807V24.528C20.4961 25.0436 20.1094 25.4304 19.5938 25.4304ZM13.4062 24.528H19.5938V20.0807H13.4062V24.528Z" fill="white"/>
</svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Photo",
    content: `<div class="d-flex row ">
      <div class="col-4  mb-2">
          <img src="placeholder.png" alt="" height="400px" width="100%">
      </div>
      <div class="col-4 mb-2">
          <img src="placeholder.png" alt="" height="400px" width="100%">
      </div>
      <div class="col-4 mb-2">
          <img src="placeholder.png" alt="" height="400px" width="100%">
      </div>
  </div>`,
  });
};
export const Testimonial = (editor) => {
  editor.BlockManager.add("testimonial", {
    label: "Testimonial",
    category: "Photo",
    media: `<svg width="40" height="36" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33788 0.411255H36.6629C38.5035 0.411255 39.9941 1.90344 39.9941 3.74407V25.4128C39.9941 27.2534 38.502 28.7456 36.6629 28.7456H13.2754L6.67225 35.3488V28.7456H3.33788C1.49725 28.7456 0.00505918 27.2534 0.00505918 25.4128V3.74407C0.00505918 1.90344 1.49725 0.411255 3.33788 0.411255ZM1.67225 25.4128C1.67225 26.3316 2.42069 27.0784 3.33788 27.0784H8.33788V31.3253L12.5848 27.0784H36.6629C37.5816 27.0784 38.3285 26.3316 38.3285 25.4128V3.74407C38.3285 2.82532 37.5801 2.07844 36.6629 2.07844H3.33788C2.41912 2.07844 1.67225 2.82532 1.67225 3.74407V25.4128Z" fill="white"/>
      </svg>
      `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Photo",
    content: `<div class="border p-2 shadow">
      <p class="text-center">Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Voluptatem, reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quam, iure. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem,
          reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, iure.
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, reiciendis. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quam, iure.
      </p>
      <div class="d-flex justify-content-center">
          <img src="/assets/placeholder.png" alt="" height="100px" width="100px" class="rounded-circle"/>
          <h2 class="text-center p-4 d-flex flex-column">
              joshson kallen <small class="text-center">Software developer</small>
          </h2>
      </div>
  </div>`,
  });
};
export const ImageBox = (editor) => {
  editor.BlockManager.add("image-box", {
    label: "Image Box",
    category: "Photo",
    media: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3H29" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 9H29" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 15H29" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 21H29" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 27H29" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 3H3V15H16V3Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 13L8 9L12 12L16 9" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Photo",
    content: `<div class="row">
      <div class="col-12">
      <div class="text-center">
          <img src="/assets/placeholder.png" alt=""/>
          </div>
          <div class="text-center">
              <h2 class="text-center">This is heading</h2>
              <p class="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                  beatae laudantium ad sapiente
                  veritatis.
                  Qui placeat similique assumenda quaerat iusto quisquam, velit nobis fugit voluptas, porro, atque
                  dignissimos ullam perspiciatis.</p>
          </div>
      </div>
  </div>`,
  });
};
export const IconBox = (editor) => {
  editor.BlockManager.add("icon-box", {
    label: "Icon Box",
    category: "Icon",
    media: `<svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.9997 17.8073C6.14316 17.8073 2.19238 13.8565 2.19238 8.99998C2.19238 4.14347 6.14316 0.192688 10.9997 0.192688C15.8562 0.192688 19.807 4.14347 19.807 8.99998C19.807 13.8565 15.8562 17.8073 10.9997 17.8073ZM10.9997 0.993375C6.5849 0.993375 2.99307 4.58509 2.99307 8.99998C2.99307 13.4149 6.5849 17.0066 10.9997 17.0066C15.4144 17.0066 19.0063 13.4148 19.0063 8.99998C19.0063 4.58521 15.4144 0.993375 10.9997 0.993375Z" fill="white"/>
      <path d="M14.2527 14.2043C14.1952 14.2044 14.1384 14.192 14.0862 14.168L11.0008 12.7558L7.91543 14.168C7.85091 14.1976 7.77969 14.2095 7.70906 14.2024C7.63844 14.1954 7.57096 14.1697 7.51355 14.128C7.45613 14.0862 7.41085 14.03 7.38234 13.965C7.35382 13.9 7.34311 13.8286 7.3513 13.7581L7.74088 10.3876L5.44446 7.88949C5.39643 7.83724 5.36315 7.77316 5.34804 7.70381C5.33293 7.63446 5.33653 7.56234 5.35847 7.49484C5.38042 7.42734 5.41991 7.36689 5.47291 7.31968C5.52591 7.27247 5.5905 7.24019 5.66008 7.22617L8.98608 6.55512L10.652 3.59928C10.6869 3.53745 10.7375 3.48599 10.7988 3.45019C10.8601 3.41438 10.9298 3.39551 11.0008 3.39551C11.0717 3.39551 11.1414 3.41438 11.2027 3.45019C11.264 3.48599 11.3146 3.53745 11.3495 3.59928L13.0155 6.55515L16.3415 7.22621C16.4111 7.24023 16.4757 7.2725 16.5287 7.31971C16.5817 7.36692 16.6212 7.42738 16.6431 7.49488C16.6651 7.56238 16.6687 7.6345 16.6536 7.70384C16.6385 7.77319 16.6052 7.83728 16.5571 7.88953L14.2607 10.3876L14.6503 13.7581C14.6568 13.8142 14.6514 13.871 14.6344 13.9249C14.6174 13.9787 14.5892 14.0283 14.5516 14.0705C14.5141 14.1126 14.468 14.1464 14.4165 14.1694C14.365 14.1925 14.3092 14.2045 14.2527 14.2044V14.2043ZM11.0008 11.9153C11.0583 11.9153 11.1151 11.9277 11.1673 11.9517L13.7734 13.1444L13.4444 10.2974C13.4378 10.2403 13.4435 10.1824 13.4613 10.1277C13.479 10.073 13.5083 10.0228 13.5473 9.9805L15.4869 7.87032L12.6776 7.3036C12.6212 7.29225 12.5679 7.26888 12.5214 7.23507C12.4749 7.20127 12.4362 7.15783 12.408 7.10772L11.0008 4.61101L9.59356 7.10769C9.56536 7.1578 9.52668 7.20123 9.48016 7.23504C9.43364 7.26884 9.38038 7.29221 9.32401 7.30356L6.51466 7.87028L8.45434 9.98031C8.49327 10.0226 8.52261 10.0728 8.54036 10.1275C8.5581 10.1822 8.56384 10.2401 8.55718 10.2972L8.22818 13.1443L10.8343 11.9515C10.8865 11.9276 10.9433 11.9152 11.0008 11.9153Z" fill="white"/>
      <path d="M5.10742 20.4496H17.166" stroke="white" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M0.955078 24.4696H21.3184" stroke="white" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
      <path d="M0.955078 27.4582H21.3184" stroke="white" stroke-miterlimit="10" stroke-linecap="square" stroke-linejoin="round"/>
      </svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Icon",
    content: `<div class="row">
      <div class="col-12 text-center">
          <i class="fa fa-star" aria-hidden="true"></i>
          <div class="text-center">
              <h2 class="text-center" >This is heading</h2>
              <p class="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                  beatae laudantium ad sapiente
                  veritatis.
                  Qui placeat similique assumenda quaerat iusto quisquam, velit nobis fugit voluptas, porro, atque
                  dignissimos ullam perspiciatis.</p>
          </div>
      </div>
  </div>`,
  });
};

export const CarousalPlugin = (editor) => {
  editor.BlockManager.add("carousal", {
    label: "Carousal",
    category: "Basic",
    attributes: {
      class: "h-20 d-inline-block",
    },
    media: `<svg width="29" height="19" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.0255 0.78125H3.97461C3.78191 0.78125 3.59711 0.857798 3.46085 0.994055C3.3246 1.13031 3.24805 1.31512 3.24805 1.50781V17.5067C3.24805 17.6994 3.3246 17.8842 3.46085 18.0205C3.59711 18.1567 3.78191 18.2333 3.97461 18.2333H25.0255C25.2182 18.2333 25.403 18.1567 25.5393 18.0205C25.6756 17.8842 25.7521 17.6994 25.7521 17.5067V1.49328C25.7483 1.30311 25.6701 1.12202 25.5342 0.988892C25.3984 0.855762 25.2157 0.781212 25.0255 0.78125ZM24.299 16.7656H4.70117V2.23438H24.299V16.7656Z" fill="white"/>
    <path d="M28.0625 2.49591C27.8731 2.49584 27.6912 2.56973 27.5555 2.70182C27.4198 2.83391 27.341 3.01378 27.3359 3.2031V15.7968C27.3359 15.9895 27.4125 16.1743 27.5487 16.3106C27.685 16.4469 27.8698 16.5234 28.0625 16.5234C28.2552 16.5234 28.44 16.4469 28.5763 16.3106C28.7125 16.1743 28.7891 15.9895 28.7891 15.7968V3.2031C28.784 3.01378 28.7052 2.83391 28.5695 2.70182C28.4338 2.56973 28.2519 2.49584 28.0625 2.49591Z" fill="white"/>
    <path d="M0.9375 2.49591C0.748114 2.49584 0.566187 2.56973 0.430473 2.70182C0.29476 2.83391 0.215988 3.01378 0.210938 3.2031V15.7968C0.210938 15.9895 0.287486 16.1743 0.423743 16.3106C0.56 16.4469 0.744804 16.5234 0.9375 16.5234C1.1302 16.5234 1.315 16.4469 1.45126 16.3106C1.58751 16.1743 1.66406 15.9895 1.66406 15.7968V3.2031C1.65901 3.01378 1.58024 2.83391 1.44453 2.70182C1.30881 2.56973 1.12689 2.49584 0.9375 2.49591Z" fill="white"/>
    </svg>`,
    content: `<div id="carouselBasicExample" class="carousel slide carousel-fade" data-mdb-ride="carousel">
       <div class="carousel-indicators">
         <button
           type="button"
           data-mdb-target="#carouselBasicExample"
           data-mdb-slide-to="0"
           class="active"
           aria-current="true"
           aria-label="Slide 1"
         > Slide 1</button>
         <button
           type="button"
           data-mdb-target="#carouselBasicExample"
           data-mdb-slide-to="1"
           aria-label="Slide 2"
         > Slide2</button>
         <button
           type="button"
           data-mdb-target="#carouselBasicExample"
           data-mdb-slide-to="2"
           aria-label="Slide 3"
         > Slide3</button>
       </div>
       <div class="carousel-inner">
         <div class="carousel-item active">
           <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp" class="d-block w-100" alt="Sunset Over the City"/>
           <div class="carousel-caption d-none d-md-block">
             <h5>First slide label</h5>
             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
           </div>
         </div>
         <div class="carousel-item">
           <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp" class="d-block w-100" alt="Canyon at Nigh"/>
           <div class="carousel-caption d-none d-md-block">
             <h5>Second slide label</h5>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </div>
         </div>
         <div class="carousel-item">
           <img src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp" class="d-block w-100" alt="Cliff Above a Stormy Sea"/>
           <div class="carousel-caption d-none d-md-block">
             <h5>Third slide label</h5>
             <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
           </div>
         </div>
       </div>
       <button class="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
            Previous
       </button>
       <button class="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
         Next
       </button>
     </div>`,
    activate: true,
    select: true,
    draggable: true,
    droppable: true,
  });
};

export const NavigationButton = (editor) => {
  editor.BlockManager.add("navigator", {
    label: "Footer Button",
    category: "Button",
    media: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.1875 21.5625H2.8125C1.78125 21.5625 0.9375 20.8647 0.9375 20.0119V12.2586C0.9375 11.4058 1.78125 10.708 2.8125 10.708H27.1875C28.2188 10.708 29.0625 11.4058 29.0625 12.2586V20.0119C29.0625 20.8647 28.2188 21.5625 27.1875 21.5625Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="14.5908" y="19.4069" width="5.30869" height="3.37337" fill="white"/>
      <mask id="path-3-inside-1_1109_7716" fill="white">
      <path d="M19.2565 25.0842L18.2523 23.0577L19.5296 22.7698C19.6294 22.7473 19.7086 22.6688 19.7336 22.5676C19.7587 22.4664 19.725 22.3604 19.6471 22.2946L15.4993 18.7936C15.418 18.7249 15.3037 18.7129 15.2086 18.7629C15.1136 18.813 15.0561 18.9156 15.0624 19.0237L15.3836 24.5413C15.3896 24.645 15.4533 24.7352 15.5474 24.7736C15.6416 24.812 15.7498 24.7918 15.8259 24.7215L16.8005 23.8229L17.8047 25.8493C17.8363 25.9132 17.8918 25.9612 17.9587 25.9829C18.0257 26.0046 18.0987 25.998 18.1618 25.9648L19.1382 25.4503C19.2694 25.3811 19.3225 25.2172 19.2565 25.0842Z"/>
      </mask>
      <path d="M19.2565 25.0842L18.6293 25.395L18.6293 25.395L19.2565 25.0842ZM18.2523 23.0577L18.0983 22.3749L17.2296 22.5707L17.6251 23.3686L18.2523 23.0577ZM19.5296 22.7698L19.3756 22.0869L19.3756 22.0869L19.5296 22.7698ZM19.7336 22.5676L19.0541 22.3995L19.0541 22.3995L19.7336 22.5676ZM19.6471 22.2946L19.1956 22.8295L19.1957 22.8296L19.6471 22.2946ZM15.4993 18.7936L15.0475 19.3283L15.0478 19.3285L15.4993 18.7936ZM15.2086 18.7629L14.8824 18.1436L14.8822 18.1437L15.2086 18.7629ZM15.0624 19.0237L15.7612 18.9831L15.7612 18.9829L15.0624 19.0237ZM15.3836 24.5413L14.6848 24.582L14.6848 24.5821L15.3836 24.5413ZM15.5474 24.7736L15.8118 24.1254L15.8115 24.1253L15.5474 24.7736ZM15.8259 24.7215L15.3514 24.2069L15.3512 24.2071L15.8259 24.7215ZM16.8005 23.8229L17.4277 23.5121L17.0129 22.6749L16.326 23.3083L16.8005 23.8229ZM17.8047 25.8493L18.432 25.5386L18.4319 25.5385L17.8047 25.8493ZM18.1618 25.9648L17.8354 25.3455L17.8353 25.3456L18.1618 25.9648ZM19.1382 25.4503L19.4645 26.0695L19.4645 26.0695L19.1382 25.4503ZM19.8837 24.7734L18.8795 22.7469L17.6251 23.3686L18.6293 25.395L19.8837 24.7734ZM18.4062 23.7406L19.6835 23.4526L19.3756 22.0869L18.0983 22.3749L18.4062 23.7406ZM19.6835 23.4526C20.0479 23.3705 20.326 23.088 20.4131 22.7357L19.0541 22.3995C19.0912 22.2496 19.2108 22.124 19.3756 22.0869L19.6835 23.4526ZM20.4131 22.7357C20.5004 22.3831 20.3857 22.002 20.0985 21.7596L19.1957 22.8296C19.0644 22.7188 19.0169 22.5498 19.0541 22.3995L20.4131 22.7357ZM20.0986 21.7597L15.9508 18.2587L15.0478 19.3285L19.1956 22.8295L20.0986 21.7597ZM15.951 18.2588C15.6489 18.0037 15.2264 17.9624 14.8824 18.1436L15.5348 19.3823C15.3809 19.4634 15.187 19.4461 15.0475 19.3283L15.951 18.2588ZM14.8822 18.1437C14.5419 18.3231 14.3414 18.6853 14.3636 19.0646L15.7612 18.9829C15.7707 19.1459 15.6853 19.303 15.5351 19.3822L14.8822 18.1437ZM14.3636 19.0644L14.6848 24.582L16.0824 24.5006L15.7612 18.9831L14.3636 19.0644ZM14.6848 24.5821C14.7061 24.9476 14.9324 25.2789 15.2834 25.4219L15.8115 24.1253C15.9741 24.1915 16.0732 24.3424 16.0824 24.5005L14.6848 24.5821ZM15.2831 25.4218C15.6347 25.5652 16.0297 25.4859 16.3006 25.236L15.3512 24.2071C15.4698 24.0976 15.6485 24.0588 15.8118 24.1254L15.2831 25.4218ZM16.3004 25.2361L17.275 24.3375L16.326 23.3083L15.3514 24.2069L16.3004 25.2361ZM16.1733 24.1337L17.1775 26.1601L18.4319 25.5385L17.4277 23.5121L16.1733 24.1337ZM17.1774 26.16C17.2916 26.3906 17.4943 26.5684 17.7433 26.6489L18.1742 25.3169C18.2893 25.3541 18.381 25.4357 18.432 25.5386L17.1774 26.16ZM17.7433 26.6489C17.9924 26.7295 18.2607 26.704 18.4883 26.584L17.8353 25.3456C17.9368 25.2921 18.059 25.2796 18.1742 25.3169L17.7433 26.6489ZM18.4881 26.5841L19.4645 26.0695L18.8118 24.831L17.8354 25.3455L18.4881 26.5841ZM19.4645 26.0695C19.9318 25.8232 20.1183 25.2467 19.8837 24.7733L18.6293 25.395C18.5266 25.1877 18.6071 24.9389 18.8118 24.831L19.4645 26.0695Z" fill="white" mask="url(#path-3-inside-1_1109_7716)"/>
      </svg>
      `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Button",
    content: `<div class='mt-5'>
    <nav id="navbar-example2" class="navbar navbar-light bg-light w-100" style="position:fixed; width:'100%' ;bottom:0px;">
    <ul class="nav nav-pills">
        <li class="nav-item">
            <a class="nav-link" href="#item-1">Button 1</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#item-2">Button 2</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#item-3">Button 3</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#item-4">Button 4</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#item-5">Button 5</a>
        </li>
    </ul>
    </nav>
    </div>`,
  });
};

export const AddAccordian = () => {
  const RandomID = Math.random().toString(36).slice(2);
  const AccordianId = RandomID ? RandomID : "CollpaseOne";
  return `
  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${AccordianId}" aria-expanded="false" aria-controls="flush-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="${AccordianId}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      <div class="tab">
      <span>Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</span>
      </div>
      </div>
    </div>
  </div>
</div>
  `;
};

export const AddTabs = () => {
  const RandomID = Math.random().toString(36).slice(2);
  const id = RandomID ? RandomID : "TabOne";
  return `
  <div>
  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#${id}" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#${id}${id}" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#${id}${id}${id}" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#${id}${id}${id}${id}" type="button" role="tab" aria-controls="pills-address" aria-selected="false">Address</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-setting-tab" data-bs-toggle="pill" data-bs-target="#${id}${id}${id}${id}${id}" type="button" role="tab" aria-controls="pills-setting" aria-selected="false">Setting</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-messages-tab" data-bs-toggle="pill" data-bs-target="#${id}${id}${id}${id}${id}${id}" type="button" role="tab" aria-controls="pills-messages" aria-selected="false">Message</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="${id}" role="tabpanel" aria-labelledby="pills-home-tab">	
  <div class="tab" style='min-height:50px'></div>
  </div>
  <div class="tab-pane fade" id="${id}${id}" role="tabpanel" aria-labelledby="pills-profile-tab">
  <div class="tab" style='min-height:50px'></div>
  </div>
  <div class="tab-pane fade" id="${id}${id}${id}" role="tabpanel" aria-labelledby="pills-contact-tab">
  <div class="tab" style='min-height:50px'></div>
  </div>
  <div class="tab-pane fade" id="${id}${id}${id}${id}" role="tabpanel" aria-labelledby="pills-address-tab">
  <div class="tab" style='min-height:50px'></div>
  </div>
  <div class="tab-pane fade" id="${id}${id}${id}${id}${id}" role="tabpanel" aria-labelledby="pills-setting-tab">
  <div class="tab" style='min-height:50px'></div>
  </div>
  <div class="tab-pane fade" id="${id}${id}${id}${id}${id}${id}" role="tabpanel" aria-labelledby="pills-messages-tab">
  <div class="tab" style='min-height:50px'></div>
  </div>
</div>
</div>
`;
};

export const OrderedList = (editor) =>
  editor.BlockManager.add("order-list", {
    label: "Order List",
    category: "List",
    media: ``,
    attributes: {
      class: "h-25 d-inline-block fa fa-list-ol",
    },
    Category: "List",
    content: `<ol>
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ol>`,
  });

export const UnOrderedList = (editor) =>
  editor.BlockManager.add("unorder-list", {
    label: "Unorder List",
    category: "List",
    attributes: {
      class: "h-25 d-inline-block fa fa-list-ul",
    },
    Category: "List",
    content: `<ul>
    <li>List Item 1</li>
    <li>List Item 2</li>
    <li>List Item 3</li>
  </ul>`,
  });

export const ListIcon = (editor) =>
  editor.BlockManager.add("list-icon", {
    label: "Icon",
    category: "List",
    media: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.9997 30.6667C7.91219 30.6667 1.33301 24.0875 1.33301 16C1.33301 7.9125 7.91219 1.33331 15.9997 1.33331C24.0872 1.33331 30.6664 7.9125 30.6664 16C30.6664 24.0875 24.0872 30.6667 15.9997 30.6667ZM15.9997 2.66669C8.64782 2.66669 2.66638 8.64793 2.66638 16C2.66638 23.3521 8.64782 29.3333 15.9997 29.3333C23.3516 29.3333 29.333 23.3519 29.333 16C29.333 8.64812 23.3516 2.66669 15.9997 2.66669Z" fill="white"/>
    <path d="M21.4154 24.6667C21.3197 24.6668 21.225 24.6461 21.1381 24.6062L16 22.2546L10.862 24.6063C10.7546 24.6555 10.636 24.6753 10.5184 24.6636C10.4007 24.6518 10.2884 24.609 10.1928 24.5396C10.0971 24.4701 10.0217 24.3764 9.97425 24.2682C9.92677 24.16 9.90894 24.0411 9.92258 23.9237L10.5713 18.3107L6.74714 14.1507C6.66715 14.0637 6.61173 13.957 6.58657 13.8415C6.56141 13.726 6.5674 13.6059 6.60394 13.4935C6.64048 13.3811 6.70625 13.2804 6.7945 13.2018C6.88276 13.1232 6.99034 13.0694 7.1062 13.0461L12.6449 11.9286L15.4193 7.00628C15.4773 6.90331 15.5616 6.81762 15.6637 6.75799C15.7657 6.69836 15.8818 6.66693 16 6.66693C16.1182 6.66693 16.2342 6.69836 16.3363 6.75799C16.4383 6.81762 16.5227 6.90331 16.5807 7.00628L19.3551 11.9287L24.8939 13.0462C25.0097 13.0695 25.1173 13.1232 25.2056 13.2019C25.2938 13.2805 25.3596 13.3812 25.3961 13.4936C25.4327 13.606 25.4387 13.7261 25.4135 13.8416C25.3883 13.957 25.3329 14.0638 25.2529 14.1508L21.4288 18.3108L22.0775 23.9237C22.0884 24.0171 22.0793 24.1117 22.051 24.2014C22.0227 24.291 21.9757 24.3736 21.9132 24.4438C21.8506 24.514 21.7739 24.5702 21.6881 24.6086C21.6024 24.6471 21.5094 24.6669 21.4154 24.6669V24.6667ZM16 20.8548C16.0958 20.8548 16.1904 20.8755 16.2774 20.9154L20.6173 22.9017L20.0694 18.1605C20.0583 18.0654 20.0678 17.9691 20.0974 17.878C20.127 17.7869 20.1758 17.7033 20.2406 17.6328L23.4707 14.1188L18.7923 13.175C18.6984 13.1561 18.6098 13.1172 18.5323 13.0609C18.4548 13.0046 18.3904 12.9323 18.3434 12.8488L16 8.69109L13.6566 12.8488C13.6096 12.9322 13.5452 13.0046 13.4677 13.0609C13.3903 13.1171 13.3016 13.1561 13.2077 13.175L8.52933 14.1187L11.7594 17.6325C11.8243 17.703 11.8731 17.7866 11.9027 17.8777C11.9322 17.9687 11.9418 18.0651 11.9307 18.1602L11.3828 22.9014L15.7227 20.9151C15.8097 20.8753 15.9043 20.8547 16 20.8548Z" fill="white"/>
    </svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Icon",
    content: `<div>
    <div><i class="fa fa-check mr-2" aria-hidden="true" style="color:#d7282f"></i>List Item 1</div>
    <div class='mt-1'><i class="fa fa-hashtag mr-2" aria-hidden="true" style="color:#d7282f"></i>List Item 2</div>
    <div class='mt-1'><i class="fa fa-times mr-2" aria-hidden="true" style="color:#d7282f"></i>List Item 3</div>
  </div>`,
  });
export const FluidContainer = (editor) =>
  editor.BlockManager.add("fluid-container", {
    label: "Fluid Container",
    category: "Container",
    media:
      '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14 7v1H2V7h12zm0-4v1H2V3h12zm0 8v1H2v-1h12zm0-4v1H2V7h12z"/></svg>',
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class='container-fluid' style="min-height: 50px"></div>`,
  });
export const Container = (editor) => {
  return editor.BlockManager.add("container", {
    label: "Container",
    category: "Container",
    media:
      '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14 7v1H2V7h12zm0-4v1H2V3h12zm0 8v1H2v-1h12zm0-4v1H2V7h12z"/></svg>',
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class='container' style="min-height: 50px;"></div>`,
  });
};

export const Header = (editor) =>
  editor.BlockManager.add("header", {
    label: "Header",
    category: "Text Selection",
    media: `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 6.02V0.5H24.5V6.02H21.14L20.5632 4.76667H14.6333V20.5906L16.34 21.14V24.5H8.66V21.14L10.3667 20.5906V4.76667H4.35125L3.86 6.02H0.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Text Selection",
    content: `<h1>H1 Heading tag<h1>`,
  });
export const TwoColumns = (editor) =>
  editor.BlockManager.add("2columns", {
    label: "2 Columns",
    category: "Container",
    media: `<svg width="69" height="52" viewBox="0 0 69 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="29" height="49" stroke="white" stroke-width="3"/>
    <rect x="38.5" y="1.5" width="29" height="49" stroke="white" stroke-width="3"/>
    </svg>    
    `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class="row">
      <div class="col-6" style="min-height: 50px;"></div>
      <div class="col-6" style="min-height: 50px;"></div>
    </div>`,
  });
export const Column = (editor) =>
  editor.BlockManager.add("1columns", {
    label: "Column",
    category: "Container",
    media: `<svg width="32" height="52" viewBox="0 0 32 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="29" height="49" stroke="white" stroke-width="3"/>
    </svg>
    `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class="row">
      <div class="col" style="min-height: 50px;"></div>
    </div>`,
  });
export const ThreeColumns = (editor) =>
  editor.BlockManager.add("3columns", {
    label: "3 Columns",
    category: "Container",
    media: `<svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.3716 0.428589H1.59062C0.951568 0.428589 0.428711 0.951446 0.428711 1.59049V51.5524C0.428711 52.1914 0.951568 52.7143 1.59062 52.7143H14.3716C15.0106 52.7143 15.5335 52.1914 15.5335 51.5524V1.59049C15.5335 0.951446 15.0106 0.428589 14.3716 0.428589ZM13.2097 50.3905H2.75252V2.7524H13.2097V50.3905ZM51.5525 0.428589H38.7716C38.1325 0.428589 37.6097 0.951446 37.6097 1.59049V51.5524C37.6097 52.1914 38.1325 52.7143 38.7716 52.7143H51.5525C52.1916 52.7143 52.7144 52.1914 52.7144 51.5524V1.59049C52.7144 0.951446 52.1916 0.428589 51.5525 0.428589ZM50.3906 50.3905H39.9335V2.7524H50.3906V50.3905ZM32.962 0.428589H20.1811C19.542 0.428589 19.0192 0.951446 19.0192 1.59049V51.5524C19.0192 52.1914 19.542 52.7143 20.1811 52.7143H32.962C33.6011 52.7143 34.1239 52.1914 34.1239 51.5524V1.59049C34.1239 0.951446 33.6011 0.428589 32.962 0.428589ZM31.8001 50.3905H21.343V2.7524H31.8001V50.3905Z" fill="white"/>
    </svg>`,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class="row">
      <div class="col-4" style="min-height: 50px;"></div>
      <div class="col-4" style="min-height: 50px;"></div>
      <div class="col-4" style="min-height: 50px;"></div>
    </div>`,
  });
export const ThreebySevenColumns = (editor) =>
  editor.BlockManager.add("3/7columns", {
    label: "2 Columns 3/7",
    category: "Container",
    media: `<svg width="59" height="52" viewBox="0 0 59 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="19" height="49" stroke="white" stroke-width="3"/>
    <rect x="28.5" y="1.5" width="29" height="49" stroke="white" stroke-width="3"/>
    </svg>
    `,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<div class="row">
    <div class="col-3" style="min-height: 50px;"></div>
    <div class="col-9" style="min-height: 50px;"></div>
  </div>`,
  });

  export const Section = (editor) =>
  editor.BlockManager.add("section", {
    label: "Section",
    category: "Container",
    media: ``,
    attributes: {
      class: "h-25 d-inline-block",
    },
    Category: "Container",
    content: `<Section style="min-height: 50px;"></Section>`,
  });