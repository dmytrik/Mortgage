const banks = [
  {
    id: '435tr34wrt',
    name: 'Mono',
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: 'asdfw342rew5',
    name: 'Privat',
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];

createListBanks();

const banksItem = document.querySelectorAll('[data-banks-item]');
banksItem.forEach(item => {
  item.addEventListener('click', showInfoBank);
});

const creatBank = document.querySelector('[data-creat-bank]');
const modal = document.querySelector('[data-backdrop]');

creatBank.addEventListener('click', openModal);
modal.addEventListener('click', closeModal);

function createListBanks() {
  const banksItems = banks
    .map(({ name }) => {
      return `<li class="mortgage__banks-item" data-banks-item data-name='${name}'>
        <p class="mortgage__banks-name">${name}</p>
      </li>`;
    })
    .join('');
  const banksList = `<ul class="mortgage__banks-list">${banksItems}</ul>`;
  const listTitle = document.querySelector(`[data-title="lists-title"]`);
  listTitle.insertAdjacentHTML('beforeend', banksList);
}
function showInfoBank(event) {
  const currentBankItem = event.currentTarget;
  const name = currentBankItem.dataset.name;
  const bank = banks.find(bank => bank.name === name);
  const infoBox = document.querySelector('[data-info-box]');
  const infoList = createInfoAboutBank(bank);
  if (currentBankItem.classList.contains('current-bank-item')) {
    currentBankItem.classList.remove('current-bank-item');
    infoBox.innerHTML = '';
    infoBox.classList.remove('mortgage__info-box');
    return;
  }
  currentBankItem.classList.add('current-bank-item');
  infoBox.innerHTML = infoList;
  infoBox.classList.add('mortgage__info-box');
  banksItem.forEach(item => {
    if (
      item.classList.contains('current-bank-item') &&
      item !== currentBankItem
    ) {
      item.classList.remove('current-bank-item');
    }
  });
}
function createInfoAboutBank(bank) {
  return `<ul class="mortgage__info-list">
    <li class="mortgage__info-item">
      <p class="mortgage__banks-property info-text">Bank :</p>
      <p class="mortgage__banks-value info-text">${bank.name}</p>
    </li>
    <li class="mortgage__info-item">
      <p class="mortgage__banks-property info-text">
        Interest rate :
      </p>
      <p class="mortgage__banks-value info-text">${bank.interestRate} %</p>
    </li>
    <li class="mortgage__info-item">
      <p class="mortgage__banks-property info-text">
        maxPayment :
      </p>
      <p class="mortgage__banks-value info-text">${bank.maxLoan} $</p>
    </li>
    <li class="mortgage__info-item">
      <p class="mortgage__banks-property info-text">
       minPayment :
      </p>
      <p class="mortgage__banks-value info-text">${bank.minPayment}</p>
    </li>
    <li class="mortgage__info-item">
      <p class="mortgage__banks-property info-text">
      Loan period :
      </p>
      <p class="mortgage__banks-value info-text">${bank.loanTerm} month</p>
    </li>
  </ul>`;
}
function openModal() {
  modal.classList.toggle('is-hidden');
}
function closeModal(event) {
  if (!event.target.classList.contains('backdrop')) {
    return;
  }
  modal.classList.toggle('is-hidden');
}
