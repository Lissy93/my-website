<script lang="ts">
  export let language = '';
  export let size: number | null = null;

  interface LanguageAttributes {
    name: string;
    icon: string;
    color: string;
    homepage?: string;
  }

  interface BadgeConfigs {
    [key: string]: LanguageAttributes;
  }

  const badgeConfigs: BadgeConfigs = {
    // Programming Languages
    android: { name: 'Android', color: '3DDC84', icon: 'android' },
    angular: { name: 'Angular', color: 'DD0031', icon: 'angular' },
    bash: { name: 'Bash', color: '4EAA25', icon: 'gnubash' },
    c: { name: 'C', color: 'A8B9CC', icon: 'c' },
    'c++': { name: 'C++', color: '00599C', icon: 'cplusplus' },
    'c#': { name: 'C#', color: '239120', icon: 'csharp' },
    coffeescript: { name: 'CoffeeScript', color: '2F2625', icon: 'coffeescript' },
    crystal: { name: 'crystal', color: '000000', icon: 'crystal' },
    css: { name: 'CSS', color: '563D7C', icon: 'css3' },
    config: { name: 'Config', color: 'EF1970', icon: 'haveibeenpwned' },
    d3: { name: 'D3.js', color: 'F9A03C', icon: 'd3dotjs' },
    dart: { name: 'Dart', color: '0175C2', icon: 'dart' },
    dockerfile: { name: 'Docker', color: '2496ED', icon: 'docker' },
    docker: { name: 'Docker', color: '2496ED', icon: 'docker' },
    elixir: { name: 'Elixir', color: '4B275F', icon: 'Elixir' },
    elm: { name: 'Elm', color: '60B5CC', icon: 'elm' },
    erlang: { name: ' Erlang', color: 'A90533', icon: ' erlang' },
    fsharp: { name: 'F#', color: 'B845FC', icon: 'fsharp' },
    flutter: { name: 'Flutter', color: '02569B', icon: 'flutter' },
    go: { name: 'Go Lang', color: '00ADD8', icon: 'go' },
    graphql: { name: 'GraphQL', color: 'E10098', icon: 'graphql' },
    html: { name: 'HTML', color: 'E34F26', icon: 'html5' },
    haskell: { name: ' Haskell', color: '5D4F85', icon: ' haskell' },
    java: { name: 'Java', color: '007396', icon: 'mocha' },
    javascript: { name: 'JavaScript', color: 'F7DF1E', icon: 'javascript' },
    julia: { name: 'Julia', color: '9558B2', icon: 'julia' },
    kotlin: { name: 'Kotlin', color: 'F18E33', icon: 'kotlin' },
    livescript: { name: 'LiveScript', color: '65ADF1', icon: 'nativescript' },
    node: { name: 'Node.js', color: '339933', icon: 'nodedotjs' },
    nim: { name: 'Nim', color: 'FFE953', icon: 'nim' },
    markdown: { name: 'Markdown', color: '000000', icon: 'markdown' },
    ocaml: { name: ' OCaml', color: 'EC6813', icon: ' ocaml' },
    perl: { name: 'Perl', color: '39457E', icon: 'perl' },
    php: { name: 'PHP', color: '777BB4', icon: 'php' },
    powershell: { name: 'PowerShell', color: '5391FE', icon: 'powershell' },
    pug: { name: 'Pug', color: 'A86454', icon: 'pug' },
    python: { name: 'Python', color: '3C78A9', icon: 'python' },
    r: { name: 'R', color: '198CE7', icon: 'r' },
    react: { name: 'React', color: '61DAFB', icon: 'react' },
    red: { name: 'Red', color: 'B32629', icon: 'red' },
    ruby: { name: 'Ruby', color: 'CC342D', icon: 'ruby' },
    rust: { name: 'Rust', color: 'e86243', icon: 'rust' },
    scala: { name: 'Scala', color: 'DC322F', icon: 'scala' },
    shell: { name: 'Shell', color: '4EAA25', icon: 'gnubash' },
    svelte: { name: 'Svelte', color: 'ff3e00', icon: 'svelte' },
    swift: { name: 'Swift', color: 'F05138', icon: 'swift' },
    typescript: { name: 'TypeScript', color: '3178C6', icon: 'typescript' },
    vue: { name: 'Vue.js', color: '4FC08D', icon: 'vuedotjs' },
    webassembly: { name: 'WebAssembly', color: '654FF0', icon: 'webassembly' },

    // DevOps
    ansible: { name: 'Ansible', color: 'EE0000', icon: 'ansible' },
    kubernetes: { name: 'Kubernetes', color: '326CE5', icon: 'kubernetes' },
    githubactions: { name: 'GitHub Actions', color: '2088FF', icon: 'githubactions' },
    prometheus: { name: 'Prometheus', color: 'E6522C', icon: 'prometheus' },
    grafana: { name: 'Grafana', color: 'F46800', icon: 'grafana' },

    // Cloud
    netlify: { name: 'Netlify', color: '00C7B7', icon: 'netlify' },
    vercel: { name: 'Vercel', color: '000000', icon: 'vercel' },
    cloudflare: { name: 'CloudFlare', color: 'F38020', icon: 'cloudflare' },
    aws: { name: 'AWS', color: '232F3E', icon: 'amazonaws' },
    azure: { name: 'Azure', color: '0089D6', icon: 'azuredevops' },
    gcp: { name: 'GCP', color: '4285F4', icon: 'googlecloud' },

    // Databases
    mysql: { name: 'MySQL', color: '4479A1', icon: 'mysql' },
    mongodb: { name: 'MongoDB', color: '47A248', icon: 'mongodb' },
    redis: { name: 'Redis', color: 'DC382D', icon: 'redis' },
    sqlite: { name: 'SQLite', color: '003B57', icon: 'sqlite' },

    // Testing
    jest: { name: 'Jest', color: 'C21325', icon: 'jest' },
    puppeteer: { name: 'Puppeteer', color: '40B5A4', icon: 'puppeteer' },
    enzyme: { name: 'Testing Library', color: 'E33332', icon: 'testinglibrary' },
    cypress: { name: 'Cypress', color: '17202C', icon: 'cypress' },

    // Security
    nmap: { name: 'Nmap', color: '4F5D95', icon: 'nmap' },
    owaspzap: { name: 'OWASP ZAP', color: '4B8BBE', icon: 'owasp' },
    burpsuite: { name: 'Burp Suite', color: 'FAC748', icon: 'burpsuite' },
    wireshark: { name: 'Wireshark', color: '1679A7', icon: 'wireshark' },
  };

  const getLangAttributes = (lang: string): LanguageAttributes | null => {
    const defaultConfig = {name: lang, color: '000000', icon: '' };
    return badgeConfigs[lang?.toLocaleLowerCase()] || defaultConfig;
  };

  const getBadgeUrl = (attributes: LanguageAttributes) => {
    if (!attributes) return null;
    const { name, color, icon } = attributes;
    const badgeEndpoint = 'https://img.shields.io/static/v1';
    return `${badgeEndpoint}?label=&message=${name}&color=${color}&logo=${icon}&logoColor=FFFFFF`;
  };

  export const langAttributes = getLangAttributes(language);
  export const badgeUrl = langAttributes ? getBadgeUrl(langAttributes) : null;
</script>

<div>
  {#if badgeUrl}
    <img
      src={badgeUrl}
      class={$$props.class}
      height={size || null}
      alt="Written in {langAttributes?.name}"
    />
  {/if}
</div>

<style lang="scss">
  img {
    filter: grayscale(20%);
    transition: all 0.1s ease-in-out;
    &:hover {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }
</style>
