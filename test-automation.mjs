#!/usr/bin/env node

/**
 * Test script to verify CMS automation setup
 * Run this to check if all automation components are working
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

console.log('🔍 Testing CMS Automation Setup...\n');

async function testAutomationSetup() {
  const results = {
    contentGeneration: false,
    buildScripts: false,
    githubActions: false,
    netlifyFunction: false,
    staticFiles: false
  };

  // Test 1: Content Generation Script
  console.log('1️⃣  Testing content generation script...');
  try {
    const { stdout } = await execAsync('npm run generate-content');
    console.log('   ✅ Content generation script works');
    results.contentGeneration = true;
  } catch (error) {
    console.log('   ❌ Content generation script failed:', error.message);
  }

  // Test 2: Build Scripts
  console.log('\n2️⃣  Checking build script configuration...');
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const hasPreBuild = packageJson.scripts.prebuild?.includes('generateStaticContent');
    const hasBuildClient = packageJson.scripts['build:client']?.includes('prebuild');
    const hasCmsSync = packageJson.scripts['cms:sync']?.includes('generateStaticContent');
    
    if (hasPreBuild && hasBuildClient && hasCmsSync) {
      console.log('   ✅ Build scripts properly configured');
      results.buildScripts = true;
    } else {
      console.log('   ⚠️  Some build scripts may be missing content generation');
    }
  } catch (error) {
    console.log('   ❌ Failed to check build scripts:', error.message);
  }

  // Test 3: GitHub Actions
  console.log('\n3️⃣  Checking GitHub Actions workflow...');
  try {
    const workflowPath = '.github/workflows/cms-sync.yml';
    if (existsSync(workflowPath)) {
      const workflow = readFileSync(workflowPath, 'utf-8');
      if (workflow.includes('generate-content') && workflow.includes('src/content/**/*.md')) {
        console.log('   ✅ GitHub Actions workflow configured');
        results.githubActions = true;
      } else {
        console.log('   ⚠️  GitHub Actions workflow exists but may be incomplete');
      }
    } else {
      console.log('   ❌ GitHub Actions workflow not found');
    }
  } catch (error) {
    console.log('   ❌ Failed to check GitHub Actions:', error.message);
  }

  // Test 4: Netlify Function
  console.log('\n4️⃣  Checking Netlify function...');
  try {
    const functionPath = 'netlify/functions/regenerate-content.js';
    if (existsSync(functionPath)) {
      console.log('   ✅ Netlify regeneration function exists');
      results.netlifyFunction = true;
    } else {
      console.log('   ❌ Netlify regeneration function not found');
    }
  } catch (error) {
    console.log('   ❌ Failed to check Netlify function:', error.message);
  }

  // Test 5: Static Files
  console.log('\n5️⃣  Checking generated static files...');
  try {
    const staticFiles = [
      'src/data/staticProducts.json',
      'src/data/staticCategories.json',
      'src/data/staticSettings.json'
    ];
    
    const allExist = staticFiles.every(file => existsSync(file));
    if (allExist) {
      // Check if files have content
      const products = JSON.parse(readFileSync('src/data/staticProducts.json', 'utf-8'));
      console.log(`   ✅ Static files exist with ${products.products?.length || 0} products`);
      results.staticFiles = true;
    } else {
      console.log('   ❌ Some static files are missing');
    }
  } catch (error) {
    console.log('   ❌ Failed to check static files:', error.message);
  }

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(Boolean).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅' : '❌';
    const name = test.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`${status} ${name}`);
  });
  
  console.log(`\n🎯 Overall Score: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('\n🚀 All automation components are working! Your CMS is ready for production.');
  } else {
    console.log('\n⚠️  Some components need attention. Check the failed tests above.');
  }

  // Next Steps
  console.log('\n📋 Next Steps:');
  console.log('1. Test CMS admin at /admin/ (create/edit content)');
  console.log('2. Verify content appears on your website');
  console.log('3. Set up Netlify build hooks for automatic deployment');
  console.log('4. Configure GitHub repository secrets if needed');
  
  return results;
}

// Run the test
testAutomationSetup().catch(console.error);
