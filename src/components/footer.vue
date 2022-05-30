
<template>
  <div>
    <footer>
      <div class="content">
        <ul>
          <li>
            <a
              href="https://forms.gle/AP3wU85928jpajna7"
              target="_blank"
              rel="noopener noreferrer"
              >問い合わせ</a
            >
          </li>
        </ul>
        <p>
          本サービスで使用されている画像の一部の権利はTYPE-MOONに帰属します。
        </p>
        <p>©TYPE-MOON / Project LUMINA</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
footer {
  margin-top: 100px;
  height: 150px;
  background-color: black;
  overflow: hidden;
  display: flex;
}

footer .content {
  margin: auto auto 50px auto;
}

footer p {
  text-align: center;
  color: aliceblue;
}

footer ul {
  text-align: center;
  color: aliceblue;
}

footer ul li {
  display: inline-block;
  margin-bottom: 10px;
}
</style>
