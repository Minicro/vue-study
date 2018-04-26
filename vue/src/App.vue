<template>
  <div id="app">
    <Layout>
      <Header>
      </Header>
      <Layout>
        <!-- <Sider hide-trigger>Sider</Sider> -->
        <Content><router-view/></Content>
      </Layout>
      <Footer></Footer>
      </Layout>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
