import{u as d}from"./utilsApiService-DW52IbpW.js";import{d as v,r as o,a as r,o as g,c as f,b as i,e as _,F as h}from"./index-Hxz3X54m.js";const y={style:{minHeight:"100vh",paddingTop:"100px",paddingBottom:"100px",maxWidth:"1600px",margin:"0 auto"}},b=v({__name:"ContactView",setup(w){const t=o(null),a=o(""),s=o("success"),n=o(!1),l=o(0),c=async e=>{n.value=!0,await d.sendContactEmail({email:e.email,firstName:e.firstName,lastName:e.lastName,companyName:e.companyName,message:e.message})===!0?(l.value=1e4,s.value="success",a.value="Your message has been sent, we will respond to you as soon as possible",t.value?.show()):(l.value=0,s.value="error",a.value="An error occurred while sending your message, please try again",t.value?.show()),n.value=!1};return(e,u)=>{const m=r("ToastComponent"),p=r("ContactSection");return g(),f(h,null,[i(m,{message:a.value,type:s.value,duration:l.value,ref_key:"toast",ref:t,style:{width:"400px"}},null,8,["message","type","duration"]),_("div",y,[i(p,{title:"Get in touch",subtitle:"Our friendly team would love to answer your questions",img:"https://creatoom.com/wp-content/uploads/2023/12/scene-with-box-paper-mockups-v4-top-view-1024x683.jpg",bgColor:"#fff",color:"#475467",loading:n.value,onSubmit:c},null,8,["loading"])])],64)}}});export{b as default};
