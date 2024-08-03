import{r as u,g as m,w as b,o as h,c as _,e,t as f,a as g,h as t,b as s,i as p,j as v,p as k,k as S}from"./index-Hxz3X54m.js";const y=(n,l)=>{const a=n.__vccOpts||n;for(const[i,r]of l)a[i]=r;return a},w={class:"code-block-container"},C=["value"],T={__name:"CodeBlock",props:{code:{type:String,required:!0}},setup(n){const l=n,a=u(null),i=u("Copy"),r=()=>{a.value&&(a.value.select(),document.execCommand("copy"),i.value="Copied!",setTimeout(()=>{i.value="Copy"},3e3))},d=()=>{a.value&&(a.value.style.height="auto",a.value.style.height=`${a.value.scrollHeight}px`)};return m(d),b(()=>l.code,d),(M,q)=>(h(),_("div",w,[e("textarea",{ref_key:"codeBlock",ref:a,class:"code-block",value:n.code,readonly:""},null,8,C),e("button",{onClick:r,class:"copy-button"},f(i.value),1)]))}},c=y(T,[["__scopeId","data-v-08cb4bab"]]),o=n=>(k("data-v-a0986a67"),n=n(),S(),n),V={class:"documentation"},I=o(()=>e("h1",{class:"title"},"How to Install and Use the Library VueLanding",-1)),x={class:"step"},H=o(()=>e("h2",{class:"subtitle"},"Step 1: Receive GitHub Personal Access Token and License Key",-1)),A=o(()=>e("p",null,[t(" You will receive two keys/tokens: "),e("br"),e("li",null,[t("a "),e("b",null,"GitHub Personal Access Token")]),e("li",null,[t("a "),e("b",null,"license key")]),t(" These are necessary to access the private repository and to use the library. ")],-1)),L={class:"step"},B=v('<h2 class="subtitle" data-v-a0986a67>Step 2: Configure <code class="file" data-v-a0986a67>.npmrc</code> File</h2><p data-v-a0986a67> Create or update the <code class="file" data-v-a0986a67>.npmrc</code> file in your project&#39;s root directory to include the provided GitHub token. This will allow npm to authenticate and download the private package. </p><ol class="instructions" data-v-a0986a67><li data-v-a0986a67> Create a <code class="file" data-v-a0986a67>.npmrc</code> file in your project root if it doesn&#39;t already exist. </li><li data-v-a0986a67> Add the following lines to <code class="file" data-v-a0986a67>.npmrc</code>, replacing <span class="token" data-v-a0986a67>YOUR_GITHUB_TOKEN</span> with the token you received: </li></ol>',3),E={class:"step"},N=o(()=>e("h2",{class:"subtitle"},"Step 3: Install the Library",-1)),R=o(()=>e("p",null,"Now, you can install the VueLanding library using npm:",-1)),j={class:"step"},U=o(()=>e("h2",{class:"subtitle"},"Step 4: Import and Initialize the Library",-1)),z=o(()=>e("p",null,[t(" Modify your main entry file (usually "),e("code",{class:"file"},"main.js"),t(" or "),e("code",{class:"file"},"main.ts"),t(") to import and initialize the library with the provided license key. ")],-1)),F={class:"step"},G=o(()=>e("h2",{class:"subtitle"},[t("Step 5: Example Usage in "),e("code",{class:"file"},"App.vue")],-1)),K=o(()=>e("p",null," After initializing the library, you can use the components in your Vue application templates. The components are registered globally, so you can use them directly in your templates. ",-1)),O=v('<section class="step" data-v-a0986a67><h2 class="subtitle" data-v-a0986a67>Available Components</h2><p data-v-a0986a67>The following components are available in the VueLanding library:</p><ul class="components-list" data-v-a0986a67><li data-v-a0986a67>CTASection</li><li data-v-a0986a67>FAQSection</li><li data-v-a0986a67>FeaturesSection</li><li data-v-a0986a67>FooterSection</li><li data-v-a0986a67>HeroSection</li><li data-v-a0986a67>MetricsSection</li><li data-v-a0986a67>NewsletterSection</li><li data-v-a0986a67>PricingSectionCards</li><li data-v-a0986a67>PricingSectionTable</li><li data-v-a0986a67>SocialProofSection</li><li data-v-a0986a67>TeamSection</li><li data-v-a0986a67>HeaderSection</li><li data-v-a0986a67>ContactSection</li><li data-v-a0986a67>ToastComponent</li></ul></section>',1),P={class:"conclusion"},Y=o(()=>e("h2",{class:"subtitle"},"Conclusion",-1)),D=o(()=>e("p",null," By following these instructions, you will be able to install and use the VueLanding library in your Vue.js project. Ensure you have received a valid GitHub token and license key from us to access and utilize the full capabilities of the library. ",-1)),$={__name:"DocInstallationView",setup(n){return(l,a)=>{const i=g("RouterLink");return h(),_("div",V,[I,e("section",x,[H,A,e("p",null,[t(" If you don't have any of those keys, here is the link to ask for a demo licence key : "),e("button",null,[s(i,{class:"demoButton",to:{name:"demo"}},{default:p(()=>[t("Demo")]),_:1})])])]),e("section",L,[B,s(c,{code:`
        //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
        @vue-landing:registry=https://npm.pkg.github.com/
        `})]),e("section",E,[N,R,s(c,{code:`
        npm install @vue-landing/vue-landing-library
        # or
        yarn add @vue-landing/vue-landing-library
        `})]),e("section",j,[U,z,s(c,{code:`
        // main.js
        import Vue from 'vue'
        import App from './App.vue'
        import { initVueLibrary } from '@vue-landing/vue-landing-library'

        // Replace with your actual license key
        const licenseKey = 'YOUR_LICENSE_KEY_HERE'

        // Initialize the library
        initVueLibrary(Vue, licenseKey)

        new Vue({
          render: h => h(App),
        }).$mount('#app')
        `})]),e("section",F,[G,K,s(c,{code:`
        <template>
          <div id='app'>
            <HeaderSection />
            <HeroSection />
            <FeaturesSection />
            <PricingSectionCards />
            <FooterSection />
          </div>
        </template>

        <script>
        export default {
          name: 'App',
        }
        <\/script>

        <style>
        /* Your styles here */
        </style>
        `})]),O,e("section",P,[Y,D,e("p",null,[t(" Here is the link to ask for a demo licence key : "),e("button",null,[s(i,{class:"demoButton",to:{name:"demo"}},{default:p(()=>[t("Demo")]),_:1})])])])])}}},J=y($,[["__scopeId","data-v-a0986a67"]]);export{J as default};
