import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('🔄 CMS content regeneration triggered');
    
    // Run the content generation script
    const scriptPath = path.join(process.cwd(), 'scripts', 'generateStaticContent.js');
    const { stdout, stderr } = await execAsync(`node ${scriptPath}`);
    
    console.log('✅ Content generation completed');
    console.log('STDOUT:', stdout);
    
    if (stderr) {
      console.warn('STDERR:', stderr);
    }

    // Trigger a new build (optional - only if you want automatic rebuilds)
    const rebuildResponse = await triggerNetlifyBuild();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify({
        success: true,
        message: 'Content regenerated successfully',
        timestamp: new Date().toISOString(),
        rebuild: rebuildResponse
      })
    };

  } catch (error) {
    console.error('❌ Content regeneration failed:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};

async function triggerNetlifyBuild() {
  // This would require a build hook URL from Netlify
  // You can set this up in Netlify's dashboard: Site settings > Build & deploy > Build hooks
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
  
  if (!buildHookUrl) {
    console.log('ℹ️  No build hook URL configured, skipping automatic rebuild');
    return { triggered: false, reason: 'No build hook configured' };
  }

  try {
    const response = await fetch(buildHookUrl, { method: 'POST' });
    if (response.ok) {
      console.log('✅ Netlify build triggered successfully');
      return { triggered: true, buildId: response.headers.get('x-netlify-build-id') };
    } else {
      console.warn('⚠️  Failed to trigger Netlify build:', response.status);
      return { triggered: false, reason: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('❌ Error triggering Netlify build:', error);
    return { triggered: false, reason: error.message };
  }
}
