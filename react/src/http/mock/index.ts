import Mock from "mockjs";

export default [
  {
    url: "/api/list", // 模拟登录的链接
    method: "get", // 请求方式
    timeout: 3000, // 超时时间
    statusCode: 200, // 返回的http状态码
    response: {
      // 返回的结果集
      code: 200,
      message: "",
      data: Mock.mock({
        "list|100": [
          {
            "id|+1": 1,
            name: "@cname",
            content: "@cparagraph",
          },
        ],
      }),
    },
  },
];
