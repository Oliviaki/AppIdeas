import instance from "@/utils/request";

export async function getBooksListApi(params = {}) {
  return instance({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes",
    params,
  });
}
