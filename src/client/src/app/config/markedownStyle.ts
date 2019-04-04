const classMap:any = {
    h1: 'ui large header',
    h2: 'ui medium header',
    ul: 'ui list',
    li: 'ui item',
    code: 'rounded-lg py-3 px-4 typescript language-typescript hljs',
    // pre: 'mx-n4'
    pre: 'rounded-lg py-3 px-4 mx-n4 hljs'
  }

export  const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));
