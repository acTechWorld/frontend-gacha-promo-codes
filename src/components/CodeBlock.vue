<template>
  <div class="code-block-container">
    <textarea ref="codeBlock" class="code-block" :value="code" readonly></textarea>
    <button @click="copyToClipboard" class="copy-button">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const codeBlock = ref(null)
const buttonText = ref('Copy')

// Function to copy code to clipboard and update button text
const copyToClipboard = () => {
  if (codeBlock.value) {
    codeBlock.value.select() // Select the content of the textarea
    document.execCommand('copy') // Copy the selected content to the clipboard
    buttonText.value = 'Copied!' // Update button text

    // Revert button text after 3 seconds
    setTimeout(() => {
      buttonText.value = 'Copy'
    }, 3000)
  }
}

// Adjust textarea height when the component is mounted or when the code prop changes
const resizeTextArea = () => {
  if (codeBlock.value) {
    codeBlock.value.style.height = 'auto' // Reset height
    codeBlock.value.style.height = `${codeBlock.value.scrollHeight}px` // Set height to fit content
  }
}

onMounted(resizeTextArea)
watch(() => props.code, resizeTextArea)
</script>

<style scoped>
.code-block-container {
  position: relative;
  background-color: #000;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.code-block {
  width: 100%;
  background-color: #000;
  color: #fff;
  font-family: monospace;
  font-size: 14px;
  white-space: pre; /* Preserve formatting */
  line-height: 1.5; /* Improve readability */
  border: none;
  overflow: hidden; /* Hide scrollbars */
  resize: none; /* Disable resizing */
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
  box-sizing: border-box; /* Include padding and border in element's total width and height */
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.copy-button:hover {
  background-color: #0056b3;
}

.copy-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.5);
}
</style>
