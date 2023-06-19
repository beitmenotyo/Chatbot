<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title></title>
	<meta name="generator" content="LibreOffice 7.5.2.2 (Windows)"/>
	<meta name="created" content="00:00:00"/>
	<meta name="changed" content="2023-06-19T10:10:00"/>
	<style type="text/css">
		@page { size: 8.27in 11.69in; margin: 0.79in }
		p { color: #000000; line-height: 115%; text-align: left; orphans: 0; widows: 0; margin-bottom: 0.1in; direction: ltr; background: transparent }
		p.western { font-family: "Liberation Serif", serif; font-size: 12pt; so-language: en-US }
		p.cjk { font-family: "0"; font-size: 12pt; so-language: zh-CN }
		p.ctl { font-family: "Arial"; font-size: 12pt; so-language: hi-IN }
	</style>
</head>
<body lang="en-US" text="#000000" link="#000080" vlink="#800000" dir="ltr"><p class="western" style="line-height: 100%; margin-bottom: 0in">
const express = require('express');</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
OpenAI = require('openai');</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
axios = require('axios');</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
cheerio = require('cheerio');</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
app = express();</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
port = process.env.PORT || 3000;</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">const
openai = new
OpenAI(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);</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">app.use(express.json());</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">app.post('/chat',
async (req, res) =&gt; {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"> 
const userMessage = req.body.message;</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  if
(userMessage.endsWith('?') &amp;&amp; isWeb3LawRelated(userMessage))
{</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">   
try {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 const response = await openai.complete({</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   engine: 'text-davinci-003',</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   prompt: userMessage,</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   maxTokens: 100,</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   temperature: 0.7,</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   n: 1,</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   stop: '\n',</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 });</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 let chatbotReply = response.data.choices[0].text.trim();</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 if (chatbotReply === 'Sorry, I don’t have the information.') {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   const keywords = extractKeywords(userMessage);</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   const searchResults = await searchWeb(keywords);</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   if (searchResults.length &gt; 0) {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
     chatbotReply = `I couldn't find the exact information, but here
are some relevant search results:\n${searchResults.join('\n')}`;</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   } else {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
     chatbotReply = &quot;I couldn't find any relevant information.&quot;;</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
   }</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 }</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 res.json({ reply: chatbotReply });</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">   
} catch (error) {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 console.error('ChatGPT4 request error:', error);</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">    
 res.status(500).json({ error: 'Something went wrong' });</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">   
}</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  }
else {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">   
res.status(400).json({ error: 'Invalid question or topic' });</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  }</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">});</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">function
isWeb3LawRelated(message) {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  //
Implement your logic to determine if the message is related to web3
laws and regulations</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">}</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">function
extractKeywords(message) {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  //
Implement your keyword extraction logic here</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">}</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">async
function searchWeb(keywords) {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">  //
Implement your web search logic here</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">}</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"><br/>

</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">app.listen(port,
() =&gt; {</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in"> 
console.log(`Server is running on http://localhost:${port}`);</p>
<p class="western" style="line-height: 100%; margin-bottom: 0in">});</p>
</body>
</html>