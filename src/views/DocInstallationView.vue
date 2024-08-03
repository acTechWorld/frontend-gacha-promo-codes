<template>
  <div class="documentation">
    <h1 class="title">How to Install and Use the Library VueLanding</h1>

    <section class="step">
      <h2 class="subtitle">Step 1: Receive GitHub Personal Access Token and License Key</h2>
      <p>
        You will receive two keys/tokens: <br />
        <li>a <b>GitHub Personal Access Token</b></li>
        <li>a <b>license key</b></li>
        These are necessary to access the private repository and to use the library.
      </p>
      <p>
        If you don't have any of those keys, here is the link to ask for a demo licence key :
        <button><RouterLink class="demoButton" :to="{ name: 'demo' }">Demo</RouterLink></button>
      </p>
    </section>

    <section class="step">
      <h2 class="subtitle">Step 2: Configure <code class="file">.npmrc</code> File</h2>
      <p>
        Create or update the <code class="file">.npmrc</code> file in your project's root directory
        to include the provided GitHub token. This will allow npm to authenticate and download the
        private package.
      </p>
      <ol class="instructions">
        <li>
          Create a <code class="file">.npmrc</code> file in your project root if it doesn't already
          exist.
        </li>
        <li>
          Add the following lines to <code class="file">.npmrc</code>, replacing
          <span class="token">YOUR_GITHUB_TOKEN</span> with the token you received:
        </li>
      </ol>
      <CodeBlock
        code="
        //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
        @vue-landing:registry=https://npm.pkg.github.com/
        "
      />
    </section>

    <section class="step">
      <h2 class="subtitle">Step 3: Install the Library</h2>
      <p>Now, you can install the VueLanding library using npm:</p>
      <CodeBlock
        code="
        npm install @vue-landing/vue-landing-library
        # or
        yarn add @vue-landing/vue-landing-library
        "
      />
    </section>

    <section class="step">
      <h2 class="subtitle">Step 4: Import and Initialize the Library</h2>
      <p>
        Modify your main entry file (usually <code class="file">main.js</code> or
        <code class="file">main.ts</code>) to import and initialize the library with the provided
        license key.
      </p>
      <CodeBlock
        code="
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
        "
      />
    </section>

    <section class="step">
      <h2 class="subtitle">Step 5: Example Usage in <code class="file">App.vue</code></h2>
      <p>
        After initializing the library, you can use the components in your Vue application
        templates. The components are registered globally, so you can use them directly in your
        templates.
      </p>
      <CodeBlock
        code="
        &lt;template&gt;
          &lt;div id='app'&gt;
            &lt;HeaderSection /&gt;
            &lt;HeroSection /&gt;
            &lt;FeaturesSection /&gt;
            &lt;PricingSectionCards /&gt;
            &lt;FooterSection /&gt;
          &lt;/div&gt;
        &lt;/template&gt;

        &lt;script&gt;
        export default {
          name: 'App',
        }
        &lt;/script&gt;

        &lt;style&gt;
        /* Your styles here */
        &lt;/style&gt;
        "
      />
    </section>

    <section class="step">
      <h2 class="subtitle">Available Components</h2>
      <p>The following components are available in the VueLanding library:</p>
      <ul class="components-list">
        <li>CTASection</li>
        <li>FAQSection</li>
        <li>FeaturesSection</li>
        <li>FooterSection</li>
        <li>HeroSection</li>
        <li>MetricsSection</li>
        <li>NewsletterSection</li>
        <li>PricingSectionCards</li>
        <li>PricingSectionTable</li>
        <li>SocialProofSection</li>
        <li>TeamSection</li>
        <li>HeaderSection</li>
        <li>ContactSection</li>
        <li>ToastComponent</li>
      </ul>
    </section>

    <section class="conclusion">
      <h2 class="subtitle">Conclusion</h2>
      <p>
        By following these instructions, you will be able to install and use the VueLanding library
        in your Vue.js project. Ensure you have received a valid GitHub token and license key from
        us to access and utilize the full capabilities of the library.
      </p>
      <p>
        Here is the link to ask for a demo licence key :
        <button><RouterLink class="demoButton" :to="{ name: 'demo' }">Demo</RouterLink></button>
      </p>
    </section>
  </div>
</template>

<script setup>
import CodeBlock from '@/components/CodeBlock.vue' // Adjust the path as needed
</script>

<style scoped>
.demoButton {
  padding: 5px 10px;
  background-color: rgb(29, 72, 109);
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.documentation {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.step {
  margin-bottom: 24px;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.file {
  background-color: #f4f4f4;
  padding: 2px 4px;
  border-radius: 4px;
}

.instructions {
  list-style-type: decimal;
  margin-bottom: 16px;
}

.token {
  font-weight: bold;
  color: #e53e3e; /* red-600 */
}

.components-list {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 16px;
}

.conclusion {
  margin-top: 24px;
}
</style>
