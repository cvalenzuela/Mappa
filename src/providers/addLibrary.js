// Add a library(.js) and style(.css) to the DOM


let addLibrary = (key, provider, script, style) => {

  let scriptTag

  if(!document.getElementById(provider)) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = script;
    scriptTag.id = provider;
    document.head.appendChild(scriptTag);
    if(style) {
      let styleTag = document.createElement('link')
      styleTag.rel = 'stylesheet'
      styleTag.href = style
      document.head.appendChild(styleTag)
    }
  }

  return scriptTag;

}

export { addLibrary };
