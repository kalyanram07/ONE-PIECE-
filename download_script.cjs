const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'journey');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const images = {
  '1_romance_dawn': 'https://images.openai.com/static-rsc-4/i-5CWabIDbBLr3PsTUEgLTMIj-7wFdI0GU0aQcIqXRWUyZNQwXl_MWnjcieNeT8Fz9avWN-Owtgzlh0HW-hniMJ5eI-X3hwl22et_j1BAOMd1RG3hjLqyLJN2LmhPI8W5qiBH-T-PnSCbgkTmc8HATRldT0vQO-PSXR52Y9jg8btukVy6GQEMgPGuYjYVmHn?purpose=fullsize',
  '2_orange_town': 'https://images.openai.com/static-rsc-4/3R5XH8c6eh4NGYFujA6qXcaFrsks4tgWsjXtKIYYgVnjr6BFeXxw3MuPnOC-0IIhCobenSgQ5OOBitvgbb6bnHSTovNu-EZKv26wNx0SXhIzI8UCDpmnzxUAFMONFhtB5LR4kYLCjN_eqWSgApNh_xjg6qDs1_Y_lr_ZsxIMUMQWCEsV4MK_vWu_gi9pvSp4?purpose=fullsize',
  '3_syrup_village': 'https://images.openai.com/static-rsc-4/FQuDDP5GSD11XnwEyygJTFZixy4kjQfO1sXzHInSa_4PjEY60lbd9mQpSk32teSuqXDtkAtwch8TgdtOUmvGq1HpDrFlYFoiEJ20ARJVK3-bUeijaG_06OuzMwZnu_HjLO9un3wxw_hc0M3C6Ur-DnfYBWOCPaw21gC_NdAarQ01BtUTuKb4Mv66We_6TwCG?purpose=fullsize',
  '5_arlong_park': 'https://images.openai.com/static-rsc-4/dKByo6r-C7SY9Hvv0eeiWlQKXErkkvaRAAUzO4zo5_6j7W08xUb7x3qO7ke4AffelIHHVQj552ZQTV75Y9nsmFMGIKjG6Ye3asJf-E210ZbB0h86wEIbsSOtHQqLy8UzX_l3rdUcidwsCCZzxjjtO5abb8Sjjo_rWcohRigST39C0vqv7PdW5dfdc9hmqROT?purpose=fullsize',
  '6_loguetown': 'https://images.openai.com/static-rsc-4/SXFnzETPE7blkEZ1zgZDV61ecX7ofVHYStrPxcTW-YAHSs8IqraSzzbX-UC4um3ZfXgxj0BE6LwWjlkZWCpgOUQQ51zPXJonygTfEEI2CqpGrL7w1y6JMe-A_xEpCGSOuhSnSLOsX0G666FWUcu3ajMgSHKv3C6VfjK9gwbT0_ERlIMn4_2LOL6xLl4Z7oUv?purpose=fullsize',
  '7_reverse_mountain': 'https://images.openai.com/static-rsc-4/1UzSDaT5qx6fthO2pqm-5AQPTzSSAMFuaw67j_1cO7R1YmQ7bPT_TbZAhLrG1elV-qBYwMN2_99cuXl4xeM-t65g-EfPY6Kl4xRBLm4Reb0h-elDfwOZN3pGrsV0a0tbjM1IK7ltgT8WkW4fx5YEN2tTgU6yZr-ek9beDuvkXGqIlE7xb_ChnriYIOSxRCqp?purpose=fullsize',
  '8_drum_island': 'https://images.openai.com/static-rsc-4/XEith-nmEAEnPsXw72CHscrCCLWm9I59VUsROl79yYa7WvLYKBBHrA4D-_i6-_Eo5LcUl-5KxToCXtAWey4xMKVZ9027Q-WNRHRRIYqvomA1qNgoA55T7HEwEmx2Yv8fzhPV6ebEccEVHzBx1mIY9ZAdOkBoYUQcB31oR0AkIMovOZ3NSlF6VfG18BbSgL6X?purpose=fullsize',
  '9_alabasta': 'https://images.openai.com/static-rsc-4/M2DcIl-4AL4XtU6s9v3shKwqeZ7NNkuwMsjCpUiikMG_zOrtO38S6BNdgrYmVURe6wd41zqktaQNq07U7L2Yu4kLr2o3mxP_bzS4qjVMAzHxk9eDUJ9lFVyLF5a3TuvaaKba6T17hXEZPQbjrY2PwRM19CoPQLPGxcEUPEFoLMfInN0Zn5FI6kT_fqC37gIA?purpose=fullsize',
  '10_skypiea': 'https://images.openai.com/static-rsc-4/bYste3lQl4a7XCC-Jv-wdwrx58hp7gn0Yw9ioYNFLIMViWF4iAnFoH-FOPiRtefcWE9pdYWC7pLUbnTwiH3o4sY_koMjDVFACcAbKmD73ECy5G5xAf6mWutUh9CLL3zaJTSXJG5eVVBKEN06Chg4NQYMNsoC9Wq4Z7V5oyjzL9OJUJh7IizQUGJt3dVnfnq2?purpose=fullsize',
  '11_water_7': 'https://images.openai.com/static-rsc-4/-G028aPloQB7JPuRcoGn3mBZSZtrhFB_MhUXrHsNW6NWJ9DWNm28YdT7SX6LCNTCbWLIU09PXdwUR1x5YH3XwvdharmUISymJArZpBOU8Cf58M8ImTdiGjOuhVKnx-NCTxxLm6wzBqdwsnx7-tLaY8lrmZZfr_XoiwRDHfIuGNah45NMwhehDccEKJbWiOA6?purpose=fullsize',
  '12_enies_lobby': 'https://images.openai.com/static-rsc-4/WY8OakVX8GNDD5--W2fyX25MqE1tP1Lqm4Sb5nQkYXHYd-XLaGXVXAtLETwmfgAA6xKnvgHx0F992CAxDKLMOug3VUn7TvzX5wJEGVweoIQ8Dsqp6WgAGEH3rRvYWgYEEVdoaXI9Nk8zT2ZTlIIO_xe7lBMFO4EE9pm1jwQKLMT3IbUJp1TmKyIUHVI5TPWO?purpose=fullsize',
  '13_thriller_bark': 'https://images.openai.com/static-rsc-4/uXSryuqY_XnjqU2L-GlEjiq1FMG2R-2c-gOJl9_JQtDEId1-jitcS0giQSb97XtBknvUWZU7S2VnjYf328bjIsz_HwL0rdLL_4EltzwhdUXsSTvsMNjGXWCvNKedjZNGc-z55gWxAa-Sq5ft36yCzq2s2JdVPKdcol28Uq8cg9iqx-pvM6wekJNNNDadlHU6?purpose=fullsize',
  '14_sabaody': 'https://images.openai.com/static-rsc-4/Q4Q-XhHs2h8-eK7E_swnf2nAgc8BpymYh-AtwFAIuMJDlxJ3iVZ1_QdubHK4bL5yjRZsw1-lX5xNG0ly5TPpMLZwv2pTETqWI1gwseTB8WW0EcFbMij-IkgkLMQpoojE0NNih9AS-iLc4xmE5xAhgjmKZqJuPWU77thCAbrNAxbkjjld7S9paqOJlWfkX7IW?purpose=fullsize',
  '15_marineford': 'https://images.openai.com/static-rsc-4/Q4hLwdZQP9lQneeZ9nCxf6Q1hLrXSr2w2z5FB0kvqkobFIpuVYv8bcsMLZfQzPuJa37KSoIlGkVWYKOOPtOK9HHh15_tpfVDMYp19qVv1jVfQ-gViG2ohgj_ksUJnaLS4ER8uPxi5MN_W_GlMxwaeVORi3ww00yRJ2mEAgnnXBBnY06leKGLSFJ_8Flmqx-R?purpose=fullsize',
  '16_post_war': 'https://images.openai.com/static-rsc-4/rc89wr3NcS0Dx_XE-ZLn5One5NDngT7dkIuMypyPuxzbZN4hawxH_VGsmVYXIyE1ztrwLuf0UF48ucKaOMw0GA3R3t6Zt69E6czcXMsZOAL-61XFDin65SbNQ790iLqLm6Mt4sElZtccd0ndqLmjkL_FzjnVuQBuNub-XUkfElnnN7ArHi1JnQSrej4EJQJf?purpose=fullsize',
  '17_fish_man_island': 'https://images.openai.com/static-rsc-4/RuQGlMn6y8b8Ob0PkViSoQBznoO3dwSvz2sJ7Rbyq4j8B4EWmNhu76SAi_QMJG5ZAZMZM0_ER5D-ba40Qf14qwspWO3LTsY94u-a3RK86Sgz8bX8MxiNFx_g9LZ_Tt_MKtIEb6P0HqrdAUfd6zwvh-3DeXKr-Q_0wxspxsSH8CKBKMlejS4k6jAPGgT5G9ov?purpose=fullsize',
  '18_punk_hazard': 'https://images.openai.com/static-rsc-4/NVrRfWTvoYzDD0muc7vWb0qdv0guhW99BKnJjmtY2Wg0Cflkcfpg2b5o0HT3ECBpn6wPDlx8DimCYv3MDgxOExZ-q-rmSRvNaptqac9k9IWXIJjxKgztXr5StHxJz_3CWqzAXt_yupsJoe8WnwXrYU8YGEP3xproWxpF_QK-KYX38O9V-mf1bed9kJfO850f?purpose=fullsize',
  '21_whole_cake_island': 'https://images.openai.com/static-rsc-4/0_ZgFfXZjMOGtASWiazFn2a3djy76cPas6RexwvmgbiWv1YqvLW5Eq52M1Q3S6KeJLacuUM1M8puV-xfiT6imoc2gVN9yAXSRBSELoS0_Ze_38SFJ18Ph40yulPO57bkSb2uewoXkbaCgGp_0aCBINp76ZhijD0SGrhESONj5gcOJ4p2Y1WEs5byd4CWFHzr?purpose=fullsize',
  '22_wano': 'https://images.openai.com/static-rsc-4/Ra27etbmY58usJ9HS7lwwqsWflNSEfsm_l9JqHDbzjBMnlduHSdeUYWqdBE_iR4JJBbIbUVUWeF96oAtfhuCwpE6MYEvMvDj-FOGttjS9579ZY-3_xzFRWCKxwUuZI151XJ4XqH0kMOr-xcWPrxTKLfe4hmEnnOf9gM4uPWeIM9SK0UcSsKTlzi8J6Bp8erP?purpose=fullsize',
  '23_egghead': 'https://images.openai.com/static-rsc-4/NUgKYbYGB9lznwJ9TE0GiskgbbQc4b5f6Hw8FGFgN3m3HEMze1OlByTKPAdvVIXETw2FxTSpFBIiLFn2ZWdbmG4JNJKMWFFTy4W_LIn6-_CAYSziGiXvixZ3X80gHEui8A41-ovBJ8VbqVrsSKkfPpi7RN9LszG0Ed4ZN9cL5VMpDbmLqnWi6O90kJFcidMc?purpose=fullsize',
  '24_finale': 'https://images.openai.com/static-rsc-4/2L36N7iBpVIr-Bsm87VCd8oDKwM_RbAhhqIlwdYDdKrdPHwjDynhEKDd-2QDQJPw-BM6LG5PUXZk6U4zpgRma3sAXWnpceuWJnLiDfM0qGzYyTbpoI-K5TbPJR5qSF-xkmc3QfqLxOCa2SRFHnQtyAzJf0kbZwHno0l7aJkOrS2zhg2zbDjSm7vMVopLHKFY?purpose=fullsize'
};

async function downloadImages() {
  for (const [name, url] of Object.entries(images)) {
    const dest = path.join(dir, `${name}.jpg`);
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${name}`);
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        console.error(`Error downloading ${name}: ${err.message}`);
        resolve(); // Continue even on error
      });
    });
  }
}

downloadImages();
