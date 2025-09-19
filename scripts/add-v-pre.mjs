// add-v-pre.js
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

// 指定要处理的目录
const directoryPath = process.argv[2] || './'; // 可以通过命令行参数指定目录

async function processMarkdownFiles(dir) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        // 递归处理子目录
        await processMarkdownFiles(filePath);
      } else if (extname(file) === '.md') {
        // 处理.md文件
        await processFile(filePath);
      }
    }
  } catch (err) {
    console.error('处理目录出错:', err);
  }
}

async function processFile(filePath) {
  try {
    // 读取文件内容
    const data = await readFile(filePath, 'utf8');
    
    // 按行分割
    const lines = data.split('\n');
    
    // 如果文件为空，跳过
    if (lines.length === 0) {
      console.log(`跳过空文件: ${filePath}`);
      return;
    }
    
    // 检查第一行是否已经是 ::: v-pre
    if (lines[0].trim() === '::: v-pre') {
      console.log(`文件已包含 ::: v-pre，跳过: ${filePath}`);
      return;
    }
    
    // 在第一行添加 ::: v-pre
    lines.unshift('::: v-pre');
    
    // 在最后一行添加 ::: (如果最后一行不是空行)
    if (lines[lines.length - 1] !== '') {
      lines.push('');
    }
    lines.push(':::');
    
    // 重新组合内容
    const newData = lines.join('\n');
    
    // 写入文件
    await writeFile(filePath, newData, 'utf8');
    console.log(`处理完成: ${filePath}`);
  } catch (err) {
    console.error('处理文件出错:', err);
  }
}

// 执行处理
processMarkdownFiles(directoryPath);
