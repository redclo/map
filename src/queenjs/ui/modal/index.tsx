import { Modal as AntdModal } from "ant-design-vue";
import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
} from "vue";
import { bool, number } from "vue-types";
import "./index.less";
import ModalConfirm from "./ModalConfirm";
import ModalForm from "./ModalForm";
import ModalInput from "./ModalInput";

const store = reactive({
  modalKeys: [] as Array<{ key: number; visible: boolean }>,
  modalMaps: new Map() as Map<number, any>,
});

const MyModal = defineComponent({
  props: {
    visible: bool().isRequired,
    modalKey: number().isRequired,
  },
  setup(props) {
    provide("modalContext", props.modalKey);
    const closeRef = ref();
    const { children, closable, title, fullscreen, width, ...otherProps } =
      store.modalMaps.get(props.modalKey);
    const baseProps: any = {
      width,
      closable,
    };
    const isSelfWidth = !(width && !fullscreen);

    if (isSelfWidth) {
      baseProps.closable = false;
      baseProps.width = "auto";
      baseProps.class =
        "inf-modal" + (fullscreen ? " ant-modal-fullscreen" : "");
      onMounted(() => {
        const closeEl = closeRef.value;
        if (closeEl) {
          const maskEl = closeEl.parentElement.parentElement;
          // maskEl.addEventListener("click", closeModal, { once: true }); 选择文件过后,会触发事件但被拦截
          maskEl.addEventListener("click", closeModal);
        }
      });
      onBeforeUnmount(() => {
        const closeEl = closeRef.value;
        if (closeEl) {
          const maskEl = closeEl.parentElement.parentElement;
          maskEl.removeEventListener("click", closeModal);
        }
      });
    } else {
      baseProps.title = title;
    }

    function closeModal(e: any) {
      if (!closeRef.value.parentElement.contains(e.target)) {
        otherProps.onCancel?.();
      }
    }

    const RenderSelfHeader = () => (
      <>
        {closable ? (
          <i
            class="ant-modal-close"
            onClick={otherProps.onCancel}
            ref={closeRef}
          >
            ×
          </i>
        ) : null}
        {title ? <div class="ant-modal-header">{title}</div> : null}
      </>
    );

    return () => {
      return (
        <AntdModal
          key={props.modalKey}
          visible={props.visible}
          footer={null}
          {...baseProps}
          {...otherProps}
        >
          {isSelfWidth ? RenderSelfHeader() : null}
          {children}
        </AntdModal>
      );
    };
  },
});

const Modal = {
  show(
    children: JSX.Element,
    config?: {
      width?: string;
      title?: string;
      afterClose?: Function;
      closable?: boolean;
      fullscreen?: boolean;
      onOk?: any;
      onCancel?: any;
      [name: string]: any;
    }
  ) {
    const key = Date.now();
    const { afterClose, ...otherConfig } = config || {};
    store.modalMaps.set(key, {
      children,
      closable: true,
      afterClose: () => {
        const itemIndex = store.modalKeys.findIndex((item) => item.key === key);
        if (itemIndex != -1) {
          store.modalKeys.splice(itemIndex, 1);
          store.modalMaps.delete(key);
        }
        afterClose?.();
      },
      onOk: () => {
        this.hidden(key);
      },
      onCancel: () => {
        this.hidden(key);
      },
      ...otherConfig,
    });
    store.modalKeys.push({ key, visible: true });
    return Modal.use(key);
  },
  hidden(key?: Number) {
    if (key) {
      const modal = store.modalKeys.find((item) => item.key === key);
      modal && (modal.visible = false);
    } else {
      store.modalKeys = [];
      store.modalMaps.clear();
    }
  },
  use(key?: number) {
    if (!key) {
      key = inject("modalContext");
    }
    const ctx = store.modalMaps.get(key as number);

    return {
      submit: ctx.onOk,
      cancel: ctx.onCancel,
      close: () => {
        Modal.hidden(key);
      },
    };
  },
  input(params: {
    title?: string;
    defaultValue?: string;
    placeholder?: string;
    onValid?: (value: string) => Promise<boolean>;
    [name: string]: any;
  }) {
    const {
      title,
      defaultValue,
      placeholder,
      maxLength,
      onValid,
      ...otherParams
    } = params;
    return new Promise((resolve) => {
      const ctx = Modal.show(
        <ModalInput
          title={title}
          defaultValue={defaultValue}
          placeholder={placeholder}
          maxLength={maxLength}
        />,
        {
          width: "4rem",
          ...otherParams,
          onOk: async (v: any) => {
            const isValid = await (onValid ? onValid(v) : true);
            if (isValid) {
              resolve(v);
              ctx.close();
            }
          },
          onCancel: () => {
            resolve(undefined);
            ctx.close();
          },
        }
      );
    });
  },
  form(params: {
    title?: string;
    content?: any;
    okText?: string;
    cancelText?: string;
    formData: any;
    [name: string]: any;
  }) {
    const { okText, cancelText, content, title, formData, ...otherParams } =
      params;

    return new Promise((resolve) => {
      const ctx = Modal.show(
        <ModalForm
          title={title}
          formData={formData}
          onSubmit={(values) => {
            resolve(values);
            ctx.close();
          }}
          onCancel={() => {
            resolve(undefined);
            ctx.close();
          }}
        >
          {content}
        </ModalForm>,
        {
          width: "4.8rem",
          ...otherParams,
          closable: false,
          onCancel: () => {
            resolve(undefined);
            ctx.close();
          },
        }
      );
    });
  },

  confirm(params: {
    title?: string;
    content?: any;
    okText?: string;
    refuseText?: string;
    type?: "danger";
    [name: string]: any;
  }) {
    const { type, okText, refuseText, content, ...otherParams } = params;
    return new Promise((resolve) => {
      const ctx = Modal.show(
        <ModalConfirm
          type={type}
          content={content}
          okText={okText}
          refuseText={refuseText}
        />,
        {
          width: "4rem",
          ...otherParams,
          onOk: async (v: any) => {
            resolve(v);
            ctx.close();
          },
          onCancel: () => {
            resolve(undefined);
            ctx.close();
          },
        }
      );
    });
  },
};

export const ModalProvider = defineComponent(() => {
  return () =>
    store.modalKeys.map(({ key, visible }) => (
      <MyModal key={key} visible={visible} modalKey={key} />
    ));
});

export default Modal;
