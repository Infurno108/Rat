const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-zPYhtXWuwmLX3d07DbiBg4lG",
    apiKey: "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",
});
const prompt = 'input: How are you doing today robro? output:'
const openai = new OpenAIApi(configuration);
const askOpenAi = async () => {
    const response = await openai.createChatCompletion("gpt-3.5-turbo", {
        prompt: prompt,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["input:"],
    });
    return response.data;
}

console.log(askOpenAi());


//console.log(completion.data.choices[0].text);


function talkCreation()
{
    document.getElementById("output").innerHTML = "Output"
}