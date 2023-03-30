import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils';
import Card from '~/components/Register/Card.vue';

describe('Testing Card Register Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    expect(wrapper.vm).toBeTruthy();
  });

  test('title card is visible', () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    const title = wrapper.find('span');

    expect(title.text()).toMatch(/ToDo App \| Register/);
  });

  test('name input typing', async () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    const inputName = wrapper.find('#name');
    await inputName.setValue('card register');

    expect(wrapper.vm.userData.name).toBe('card register');
  });

  test('email input typing', async () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    const inputEmail = wrapper.find('#email');
    await inputEmail.setValue('email@email.com');

    expect(wrapper.vm.userData.email).toBe('email@email.com');
  });


  test('password input typing', async () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    const inputPassword = wrapper.find('#password');
    await inputPassword.setValue('123456');

    expect(wrapper.vm.userData.password).toBe('123456');
  });

  test('password confirm input typing', async () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    const inputPasswordConfirm = wrapper.find('#password_confirm');
    await inputPasswordConfirm.setValue('123456');

    expect(wrapper.vm.userData.password_confirmation).toBe('123456');
  });


  test('form data is empty initially', async () => {
    const wrapper = shallowMount(Card, {
      stubs: {
        NuxtLink: RouterLinkStub
      }
    });

    expect(wrapper.vm.userData.name).toBeNull();
    expect(wrapper.vm.userData.email).toBeNull();
    expect(wrapper.vm.userData.password).toBeNull();
    expect(wrapper.vm.userData.password_confirmation).toBeNull();
  });

});

