const { writeFileSync } = require('fs')

const path = require('path')

let fetch
import('node-fetch').then(({ default: f }) => {
  fetch = f
  reqJuejin(1)
})

const articles = []

const reqJuejin = page_no =>
  fetch('https://api.juejin.cn/content_api/v1/article/list_by_user?aid=2608&uuid=7259181137129358863&spider=0', {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/json',
      'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'x-secsdk-csrf-token': '00010000000149c988447e760ec6d5e15e95b745171c2593a9775d684f3677613381fc35de11177b836c7b8fff5d',
      cookie:
        '__tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227259181137129358863%2522%252C%2522user_unique_id%2522%253A%25227259181137129358863%2522%252C%2522timestamp%2522%253A1690159839194%257D; passport_csrf_token=25e655362356da605beb01f738726370; passport_csrf_token_default=25e655362356da605beb01f738726370; n_mh=pKG77FJQOrZTAh4MhH3pUvSrlLCo6Ssg99ix1gJThGM; passport_auth_status=26315e7580b2ce148a025296ffd95b23%2C; passport_auth_status_ss=26315e7580b2ce148a025296ffd95b23%2C; sid_guard=f9c1daab88dd442a9a3562841a271d51%7C1690159898%7C31536000%7CTue%2C+23-Jul-2024+00%3A51%3A38+GMT; uid_tt=56e8e1e993a03973408cb87e9e9028e1; uid_tt_ss=56e8e1e993a03973408cb87e9e9028e1; sid_tt=f9c1daab88dd442a9a3562841a271d51; sessionid=f9c1daab88dd442a9a3562841a271d51; sessionid_ss=f9c1daab88dd442a9a3562841a271d51; sid_ucp_v1=1.0.0-KDhiYzcxN2RhYWYyZGZiOGY3MDJmYmZiMGI0MTU3NjUzMTI3NDc1ODYKFwiOqLCJ_PXvARCalvelBhiwFDgCQPEHGgJscSIgZjljMWRhYWI4OGRkNDQyYTlhMzU2Mjg0MWEyNzFkNTE; ssid_ucp_v1=1.0.0-KDhiYzcxN2RhYWYyZGZiOGY3MDJmYmZiMGI0MTU3NjUzMTI3NDc1ODYKFwiOqLCJ_PXvARCalvelBhiwFDgCQPEHGgJscSIgZjljMWRhYWI4OGRkNDQyYTlhMzU2Mjg0MWEyNzFkNTE; store-region=cn-zj; store-region-src=uid; _ga=GA1.2.143415306.1690159915; _tea_utm_cache_2608={%22utm_source%22:%22news%22%2C%22utm_medium%22:%22push%22%2C%22utm_campaign%22:%22jinshi20235%22}; _ga_S695FMNGPJ=GS1.2.1691734415.12.0.1691734415.60.0.0; csrf_session_id=348b6529aba6ec35bc005002b4b6e1da; msToken=_MdCk4YIf2IAhHtONBc5dd2ZvdmPGnEnWIb7WIdFPAA0Gl0k_S29X64_mCE0MVl71UCSNL-fuCV9WZnkfGXwhvZZrGWGqe53adDdtpWNg6oHY-OovTiCf881ZcVP31Xk',
      Referer: 'https://juejin.cn/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: '{"audit_status":null,"keyword":"","page_size":20,"page_no": ' + page_no + '}',
    method: 'POST',
  })
    .then(res => res.json())
    .then(jsonData => {
      const { count, data } = jsonData
      articles.push(...data)
      if (count / 20 > page_no) {
        reqJuejin(page_no + 1)
      } else {
        getTimeLines()
      }
    })

/**
 * 从掘金的接口获取数据并处理返回
 * @param {*} articles
 * @returns
 */
function getTimeLines() {
  const timelines = articles.map(arl => {
    const { article_info, tags, article_id } = arl
    const { title, ctime, brief_content, cover_image } = article_info
    return {
      article_id,
      title,
      content: brief_content,
      cover_image,
      tags: tags.map(tag => tag.tag_name).join('、'),
      time: new Date(Number(ctime.padEnd(ctime.length + 3, '0'))).toLocaleDateString('zh-CN'),
    }
  })

  writeFileSync(path.resolve('articles/juejin-articles.js'), `export const origin = ${JSON.stringify(timelines, null, 2)}`)
}
