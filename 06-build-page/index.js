const fs = require('fs').promises;
const path = require('path');

async function createProject() {
  try {
    // Create project directory
    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    // Create assets directory
    await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {
      recursive: true,
    });

    // Create index.html
    await fs.open(path.join(__dirname, 'project-dist', 'index.html'), 'w');

    // Read template and components
    const templateContent = await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf8',
    );
    const components = await fs.readdir(path.join(__dirname, 'components'), {
      withFileTypes: true,
    });

    // Replace components in template
    let contentTemplate = templateContent;
    for (const component of components) {
      if (component.isFile() && component.name.endsWith('.html')) {
        const componentName = component.name.slice(
          0,
          component.name.indexOf('.'),
        );
        const componentContent = await fs.readFile(
          path.join(__dirname, 'components', component.name),
          'utf8',
        );

        contentTemplate = contentTemplate.replace(
          new RegExp(`{{${componentName}}}`, 'g'),
          componentContent,
        );
      }
    }

    // Write index.html
    await fs.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      contentTemplate,
    );

    // Create style.css
    await fs.open(path.join(__dirname, 'project-dist', 'style.css'), 'w');

    // Read styles and append to style.css
    const styles = await fs.readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    for (const style of styles) {
      if (style.isFile() && style.name.endsWith('.css')) {
        const styleContent = await fs.readFile(
          path.join(__dirname, 'styles', style.name),
          'utf8',
        );
        await fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          styleContent,
        );
      }
    }

    // Copy assets
    const assets = await fs.readdir(path.join(__dirname, 'assets'));
    for (const asset of assets) {
      await fs.mkdir(path.join(__dirname, 'project-dist', 'assets', asset), {
        recursive: true,
      });
      const assetFiles = await fs.readdir(
        path.join(__dirname, 'assets', asset),
      );
      for (const assetFile of assetFiles) {
        await fs.copyFile(
          path.join(__dirname, 'assets', asset, assetFile),
          path.join(__dirname, 'project-dist', 'assets', asset, assetFile),
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
}

createProject();
