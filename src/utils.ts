import { ComposerTranslation } from 'vue-i18n';

export function getTranslatedName(
  transactionName: string,
  t: ComposerTranslation
) {
  if (transactionName.startsWith('_')) {
    return t(`transfers.${transactionName}`);
  } else {
    return transactionName;
  }
}
