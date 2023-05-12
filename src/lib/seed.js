export function seed(functions) {
  const createPageCallable = httpsCallable(functions, "createPage");

  let data = [
    {
      type: "image",
      value: "https://hakan.candar.dev/_next/static/media/hakan.975e146f.jpg"
    },
    {
      type: "kvpair",
      value: [
        ["doğum tarihi", "16.05.2004"],
        ["okul", "t.c. yeditepe üniversitesi"]
      ]
    },
    {
      type: "text",
      value: "qrbook sitesinin yapımcısı"
    }
  ];

  createPageCallable({ data, title: "test" }).then((data) => {
    data = data.data;
    console.log(data);
  });
}