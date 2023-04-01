import { RouterLinkStub, createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Card from "~/components/Login/Card.vue";

const mock = jest.fn(() => Promise.resolve('response'));
const mocks = {
  mocks: {
    $axios: {
      get: mock,
    },
  },
  stubs: {
    NuxtLink : RouterLinkStub
  }
};

describe('Testing Card Login component', () => {

  test('is a vue intance', () => {
    const wrapper = shallowMount(Card, mocks);

    expect(wrapper.vm).toBeTruthy();
  })

  test('title card login is visible', () => {
    const wrapper = shallowMount(Card, mocks);

    const title = wrapper.find('span');

    expect(title.text()).toMatch(/ToDo App \| Login/);
  });

  test('email input typing', async () => {
    const wrapper = shallowMount(Card, mocks);

    const inputEmail = wrapper.find('#email');
    await inputEmail.setValue('email@email.com');

    expect(wrapper.vm.credentials.email).toBe('email@email.com');
  });


  test('password input typing', async () => {
    const wrapper = shallowMount(Card, mocks);

    const inputPassword = wrapper.find('#password');
    await inputPassword.setValue('123456');

    expect(wrapper.vm.credentials.password).toBe('123456');
  });

});
