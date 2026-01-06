// Script para listar modelos disponíveis na sua API key
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBYQuDeNKXJHJnKwDK_ylJ8GjKqnUaMpdA';

async function listModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    if (!response.ok) {
      console.error('Erro:', response.status, response.statusText);
      const text = await response.text();
      console.error(text);
      return;
    }
    
    const data = await response.json();
    
    console.log('\n=== MODELOS DISPONÍVEIS ===\n');
    
    if (data.models) {
      data.models.forEach(model => {
        console.log(`📌 ${model.name}`);
        console.log(`   Métodos: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('Nenhum modelo encontrado');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Erro ao listar modelos:', error.message);
  }
}

listModels();


