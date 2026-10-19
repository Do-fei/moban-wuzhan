import type { Story } from './types'

export const story: Story = {
  title: '末班无站',
  subtitle: '北新桥夜行记',
  start: 'c1_001',
  chapters: [
    '第一章 · 末班',
    '第二章 · 井儿胡同',
    '第三章 · 门墩',
    '第四章 · 收音机',
    '第五章 · 井底的名字',
    '第六章 · 第三声钟',
  ],
  clues: {
    ticket: {
      id: 'ticket',
      title: '旧纸票',
      summary: '1999 年 11 月 7 日的 13 路纸票，盖着“作废”，背面有一行褪色的铅笔字。',
    },
    'red-shoe': {
      id: 'red-shoe',
      title: '红色童鞋',
      summary: '一只很小的红灯芯绒布鞋，鞋底用白线绣着一个“满”字。',
    },
    doorstone: {
      id: 'doorstone',
      title: '缺角门墩',
      summary: '旧院门前的青石门墩缺了一角，内侧刻着三道身高线和“小满 九岁 九九·十”。',
    },
    radio: {
      id: 'radio',
      title: '调度录音',
      summary: '老人收音机里反复播放的 1999 年调度广播：末班车临时改行井儿胡同，车上还有一个孩子。',
    },
    sweater: {
      id: 'sweater',
      title: '未收口的红毛衣',
      summary: '一件织到一半的红毛衣，袖口还别着竹针。毛线上有一股旧樟木箱和雨水的味道。',
    },
    confession: {
      id: 'confession',
      title: '赵长顺的证词',
      summary: '1999 年那晚的司机还活着。他说车陷进井口后，苏慧回车里找孩子，井壁塌了。事故被当成“路面塌陷”处理。',
    },
    name: {
      id: 'name',
      title: '苏慧',
      summary: '母亲的名字。不是“妈”，不是“小满的妈”，是苏慧。一个差点被井和档案一起抹掉的名字。',
    },
  },
  endings: {
    survive: {
      title: '槐树胡同的灯',
      subtitle: '生还结局',
      description: '你在第三声钟响前离开了那趟车。旧城放你回去，却把一件很小的东西留在了你身上。',
      order: 1,
    },
    lost: {
      title: '第十三排乘客',
      subtitle: '迷失结局',
      description: '你误判了井的规则，把名字交了出去。下一年的末班车上，多了一个劝别人不要回头的乘客。',
      order: 2,
    },
    truth: {
      title: '把名字还给井',
      subtitle: '真相结局',
      description: '你让一段被掩埋的往事重新有了名字，也把母亲从自己的记忆里交还给了她。',
      order: 3,
    },
  },
  nodes: {
    c1_001: {
      kind: 'dialogue',
      id: 'c1_001',
      chapter: 1,
      scene: 'street',
      place: '东四 · 23:06',
      lines: [
        {
          text: '电台的走廊只剩下一盏应急灯。我把最后一版片头曲导出，电脑右下角跳到二十三点零六分。',
          narration: true,
        },
        {
          text: '窗外是深秋的北京。风把银杏叶吹到马路牙子上，又被夜班环卫工的扫帚推成一小堆，像谁在路边烧过一沓没烧完的纸。',
          narration: true,
        },
        {
          text: '我在区级电台做后期。白天剪广告，晚上替一档没人听的民俗节目修老录音。工作不体面，但足够让我错过每一班正常的公交车。',
          narration: true,
        },
        {
          text: '下午修的那盘带子录于一九九九年。磁带壳裂了一道缝，标签订着“十三路末班·环境声”。我在里面听见关门声、雨声，还有一个女人很轻地哼歌。',
          narration: true,
        },
        {
          text: '带子放到一半就断了。我把断口接好，却总觉得后半段里有人在叫一个名字。耳机摘下来，办公室又安静得像水下。',
          narration: true,
        },
        {
          text: '手机弹出末班车提醒：13 路，还有四分钟。',
          narration: true,
        },
        {
          text: '我抓起外套下楼。母亲离开后的这些年，我搬过很多次家，却一直没搬出北新桥这一片。说不上为什么，好像只要还住在这附近，某些没弄明白的事就还有机会找上门。',
          narration: true,
        },
        {
          text: '姥姥生前从不提她。每年十一月初七，姥姥会多摆一副碗筷，吃完饭又默默收走。我问那是给谁的，姥姥只说：“给一个赶不上饭点的人。”',
          narration: true,
        },
      ],
      next: 'c1_002',
    },
    c1_002: {
      kind: 'dialogue',
      id: 'c1_002',
      chapter: 1,
      scene: 'street',
      place: '北新桥路口',
      lines: [
        {
          text: '站牌立在两棵槐树中间。铁皮上的绿漆起了泡，“北新桥”三个字里，“桥”字掉了一半，只剩右边的“乔”。',
          narration: true,
        },
        {
          text: '我在这条街上住了三年，从没注意过这个站牌。它像一件被人遗忘了的旧家具，白天碍眼，到了晚上反而和树影长在一起。',
          narration: true,
        },
        {
          text: '风从胡同里穿出来，带着煤灰、湿土和一种很旧的肥皂味。远处有人关铁门，门轴响了一声，又没了动静。',
          narration: true,
        },
        {
          text: '路口的小卖部还亮着半扇卷帘门。老板娘坐在柜台后听评书，桌上摆着一盆冻得发硬的柿子。她抬头看了我一眼，又看了看站牌，像想说什么，最后只是把收音机音量拧小。',
          narration: true,
        },
        {
          text: '一个骑车人从雾里过来，车铃响了两下。经过站牌时，他忽然捏住刹车，回头望了一眼，随即又蹬车走了。链条声在胡同里响了很久。',
          narration: true,
        },
        {
          text: '车灯从街口转过来。不是公交那种刺眼的白光，是两团发黄的灯，像有人在纸灯笼里点了蜡烛。',
          narration: true,
        },
      ],
      next: 'c1_003',
    },
    c1_003: {
      kind: 'dialogue',
      id: 'c1_003',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '13 路靠站时几乎没发出声音。车门打开，一股暖气混着柴油味扑出来。',
          narration: true,
        },
        {
          text: '车里没有开顶灯。司机坐在暗处，只能看见一双搭在方向盘上的手。靠窗坐着一个穿棕色大衣的女人，正在织毛衣；她前排的老人抱着一台掉了漆的半导体收音机。最后一排还有个年轻女人，歪着头睡着了。',
          narration: true,
        },
        {
          text: '老人怀里的收音机正在播天气预报。电流声很重，播音员说今夜有雾，明天晴，最低气温零下一度。日期却像是被谁用指甲反复刮过，听不真切。',
          narration: true,
        },
        {
          text: '车门内侧贴着一张手写的线路图。站名从“东四”一路排到“鼓楼”，中间没有北新桥。线路图的右下角，有人用圆珠笔补了三个小字，墨迹已经洇开。',
          narration: true,
        },
        {
          speaker: '司机',
          text: '上不上？后头没车了。',
        },
      ],
      next: 'c1_board',
    },
    c1_board: {
      kind: 'choice',
      id: 'c1_board',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我一只脚已经踏上踏板。司机没有回头，后视镜里却有一小块影子动了动。',
          narration: true,
        },
      ],
      prompt: '车门在我身后轻轻合上。我决定——',
      options: [
        {
          id: 'ask',
          label: '问一句：“师傅，这车到北新桥吗？”',
          hint: '先把路问清楚。',
          next: 'c1_ask_1',
          effects: { setFlags: ['askedDriver'] },
        },
        {
          id: 'follow',
          label: '不问了，跟着棕衣女人往后走。',
          hint: '她已经替我投过币。',
          next: 'c1_follow_1',
          effects: { setFlags: ['followedWoman'] },
        },
      ],
    },
    c1_ask_1: {
      kind: 'dialogue',
      id: 'c1_ask_1',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          speaker: '我',
          text: '师傅，到北新桥吗？',
        },
        {
          text: '司机的手在方向盘上停了一下。',
          narration: true,
        },
        {
          speaker: '司机',
          text: '到。北新桥嘛，到不了。',
        },
        {
          speaker: '我',
          text: '……什么意思？',
        },
        {
          speaker: '司机',
          text: '上车吧。到了我叫你。',
        },
        {
          text: '他说完这句，把后视镜往旁边掰了一点。我看见镜子里映出空荡荡的最后一排，可我刚才明明看见那里坐着人。',
          narration: true,
        },
      ],
      next: 'c1_seat',
    },
    c1_follow_1: {
      kind: 'dialogue',
      id: 'c1_follow_1',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我跟着棕衣女人往里走。经过投币箱时，司机说：“她替你投过了。”',
          narration: true,
        },
        {
          text: '我回头看她。她没有看我，只把手里的毛线往上提了提。她的手腕很细，腕骨上系着一根红线。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '坐吧。空座多。',
        },
        {
          text: '她的声音很轻，像怕惊动谁。我在她斜后方坐下，才发现车里安静得过分，连发动机的声音都像从水底传上来的。',
          narration: true,
        },
      ],
      next: 'c1_seat',
    },
    c1_seat: {
      kind: 'dialogue',
      id: 'c1_seat',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我挑了右边靠窗的位置。座椅是旧式的蓝布面，扶手被磨得发亮，缝里嵌着瓜子皮和一层薄薄的灰。',
          narration: true,
        },
        {
          text: '车开得很稳。窗外的店铺一间间退过去，招牌上的字被雨水晕开。槐树的枝影扑在玻璃上，又顺着玻璃滑下去。',
          narration: true,
        },
        {
          text: '过了东四，本该往南拐。车却直直开进了旧城更深处。路边的院墙一色灰，门楼一色黑，像一条洗得发白的旧裤子。',
          narration: true,
        },
        {
          text: '我摘下耳机。车厢里没有广播，没有报站，只有毛衣针碰在一起的嗒、嗒声。每响一下，窗外的路灯就往后挪一格。',
          narration: true,
        },
        {
          text: '前排老人的收音机忽然沙沙响了两声。他伸手拍了一下机器，声音停了。老人的手背上有一道很长的旧疤，像被什么细硬的东西勒过。',
          narration: true,
        },
        {
          text: '右手边的座椅缝里，露出一个发黄的纸角。',
          narration: true,
        },
      ],
      next: 'c1_ticket',
    },
    c1_ticket: {
      kind: 'choice',
      id: 'c1_ticket',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '那种纸票现在已经很少见了。边角被磨得发毛，像在谁的衣兜里揣了很多年。',
          narration: true,
        },
      ],
      prompt: '要把它抽出来看看吗？',
      options: [
        {
          id: 'take',
          label: '抽出来，借着窗外的光看清上面的字。',
          hint: '旧东西不会无缘无故出现在这里。',
          next: 'c1_ticket_take',
          effects: { addClues: ['ticket'] },
        },
        {
          id: 'leave',
          label: '别碰。也许是谁掉的东西。',
          hint: '有些旧纸不该在手心里焐热。',
          next: 'c1_ticket_leave',
        },
      ],
    },
    c1_ticket_take: {
      kind: 'dialogue',
      id: 'c1_ticket_take',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '纸票被我捏在两指之间。票面印着褪色的红字：13 路，北新桥—鼓楼。',
          narration: true,
        },
        {
          text: '日期栏里是“1999 年 11 月 7 日”。票根被剪了一个三角口，又盖上一枚歪斜的“作废”。',
          narration: true,
        },
        {
          text: '我翻到背面。铅笔写过一行字，被汗和岁月蹭得只剩几个笔画能认出来：',
          narration: true,
        },
        {
          speaker: '旧纸票',
          text: '小满，别怕。妈在。',
        },
        {
          text: '车猛地颠了一下。纸票从我手里滑出去，却没有落在地上，而是像被什么东西接住似的，轻轻贴回了座椅缝里。',
          narration: true,
        },
        {
          text: '我把手收回来，指尖全是铁锈味。',
          narration: true,
        },
      ],
      next: 'c1_ride',
    },
    c1_ticket_leave: {
      kind: 'dialogue',
      id: 'c1_ticket_leave',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我把视线挪开。纸角在座椅缝里翘着，随着车身的震动轻轻抖。',
          narration: true,
        },
        {
          text: '过了两站，它还在那儿。又过了一站，它不见了。',
          narration: true,
        },
        {
          text: '我没有看见谁把它拿走。只是再低头时，膝盖上多了一小片灰。我拍了两下，拍不干净。',
          narration: true,
        },
      ],
      next: 'c1_ride',
    },
    c1_ride: {
      kind: 'dialogue',
      id: 'c1_ride',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '棕衣女人一直在织毛衣。竹针碰在一起，发出很轻的嗒、嗒声，正好卡在发动机的低鸣里。',
          narration: true,
        },
        {
          text: '她脚边的地上放着一只红色的小布鞋。鞋面是灯芯绒的，鞋底纳得很厚，只有孩子的手掌那么长。',
          narration: true,
        },
        {
          text: '车转弯时，那只鞋滑到了我的脚边。',
          narration: true,
        },
      ],
      next: 'c1_shoe',
    },
    c1_shoe: {
      kind: 'choice',
      id: 'c1_shoe',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '女人似乎没有察觉。她低着头，一针一针地织，红线在指间绕得很紧。',
          narration: true,
        },
      ],
      prompt: '那只红布鞋就在我的鞋尖前。',
      options: [
        {
          id: 'return',
          label: '捡起来，掸掉灰，递还给她。',
          hint: '只是一件小事。',
          next: 'c1_shoe_return',
          effects: { addClues: ['red-shoe'], setFlags: ['returnedShoe'] },
        },
        {
          id: 'ignore',
          label: '假装没看见，把脚往里收了收。',
          hint: '少和陌生乘客搭话。',
          next: 'c1_shoe_ignore',
        },
      ],
    },
    c1_shoe_return: {
      kind: 'dialogue',
      id: 'c1_shoe_return',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我弯腰把鞋捡起来。布面是温的，像刚从谁的脚上脱下来。鞋底用白线纳了一个小小的“满”字，针脚很密。',
          narration: true,
        },
        {
          speaker: '我',
          text: '您的鞋。',
        },
        {
          text: '女人抬起脸。车窗外一闪而过的路灯光掠过她的眼睛，我看见她眼角的细纹，和一种很疲倦的温柔。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '小满，脚还冷不冷？',
        },
        {
          text: '我愣住了。',
          narration: true,
        },
        {
          speaker: '我',
          text: '您叫我什么？',
        },
        {
          text: '她没有回答，只把鞋接过去，放在膝盖上，用手掌慢慢抚平鞋面。那动作熟练得让我心里发紧。',
          narration: true,
        },
        {
          text: '司机的目光在后视镜里停了一瞬。镜子里，他的嘴唇动了动，像在说“别应”。',
          narration: true,
        },
      ],
      next: 'c1_next_stop',
    },
    c1_shoe_ignore: {
      kind: 'dialogue',
      id: 'c1_shoe_ignore',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '我把脚收回来，盯着窗外。那只红鞋停在过道中间，像一小块没有干涸的血。',
          narration: true,
        },
        {
          text: '过了很久，我听见女人叹了口气。她没有弯腰，鞋却回到了她脚边。',
          narration: true,
        },
        {
          text: '“小满。”她忽然叫了一声。',
          narration: true,
        },
        {
          text: '我没有回头。车上没有人叫这个名字。至少我以为没有。',
          narration: true,
        },
      ],
      next: 'c1_next_stop',
    },
    c1_next_stop: {
      kind: 'dialogue',
      id: 'c1_next_stop',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          speaker: '报站器',
          text: '下一站，北新桥。',
        },
        {
          text: '报站器的女声很清楚，尾音却拖着一层电流的沙沙声。我抬头去看车厢前方的显示屏，上面滚动的红字是：',
          narration: true,
        },
        {
          speaker: '显示屏',
          text: '下一站：井儿胡同。',
        },
        {
          text: '我在这附近住了三年，从没听说过“井儿胡同”这个站。',
          narration: true,
        },
        {
          text: '最后一排的年轻女人醒了。她摘下一边耳机，茫然地看了看窗外。',
          narration: true,
        },
        {
          speaker: '年轻女人',
          text: '师傅，我是不是坐过站了？我要在交道口下。',
        },
        {
          speaker: '司机',
          text: '刚过北新桥。你早下了一站。',
        },
        {
          text: '年轻女人皱了皱眉，像在努力回忆什么。她看了看手机，屏幕没有信号。然后她把耳机重新戴好，把头靠回玻璃上。',
          narration: true,
        },
        {
          speaker: '年轻女人',
          text: '那我再坐一站。',
        },
        {
          text: '车窗上倒映出她的脸。车开过下一盏路灯时，她的座位已经空了。过道里没有脚步声，车门也没有开过。',
          narration: true,
        },
        {
          text: '我站起来看了一眼。座位上留着一只耳机，线垂在地上，里面还在漏出很轻的音乐。是九十年代的一首老歌，我在电台的旧磁带里听过。',
          narration: true,
        },
        {
          text: '“别捡。”老人头也不回地说。',
          narration: true,
        },
        {
          text: '我缩回手。耳机里的歌忽然断了，变成一段公交车报站：“车辆起步，请扶稳坐好。”',
          narration: true,
        },
        {
          text: '前排的老人忽然把收音机音量拧大。沙沙的电流里，一个更年轻的女声挤了出来。',
          narration: true,
        },
        {
          speaker: '收音机',
          text: '……十三路末班车，因北新桥施工，临时改行井儿胡同。请沿线乘客注意脚下，不要靠近井口……',
        },
        {
          text: '老人的手指压在调频轮上，指节发白。',
          narration: true,
        },
      ],
      next: 'c1_rules',
    },
    c1_rules: {
      kind: 'dialogue',
      id: 'c1_rules',
      chapter: 1,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '车拐进一条极窄的胡同。槐树的枝条刮过车顶，发出指甲刮黑板一样的细响。',
          narration: true,
        },
        {
          text: '两边的院墙几乎贴着车窗。一只花猫蹲在墙头，眼睛在车灯里亮了一下，随即跳进黑暗。谁家的电视还在播晚间新闻，声音被风撕成一片一片。',
          narration: true,
        },
        {
          text: '我想起小时候坐这趟车，母亲总让我数站。数到第五站就到家了。她说，坐车不能睡，睡了会坐过站。可她自己每次都在车上打盹，头一点一点的。',
          narration: true,
        },
        {
          text: '老人终于回头。他的脸在暗处像一张揉皱的旧报纸。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '姑娘，记住三件事。',
        },
        {
          speaker: '老人',
          text: '过了北新桥，听见谁叫你的名字，都别应。',
        },
        {
          speaker: '老人',
          text: '别在井儿胡同下车。',
        },
        {
          speaker: '老人',
          text: '远处钟响第三声之前，到槐树胡同，赶紧下去。',
        },
        {
          speaker: '我',
          text: '什么钟？车铃吗？',
        },
        {
          speaker: '老人',
          text: '不是车铃。是旧城那边的钟。一声比一声远。你要是听见第三声还在车上，就晚了。',
        },
        {
          text: '他说话的时候，收音机里有人敲了三下麦克风。老人立刻把机器按进怀里，像按住一只想飞的鸟。',
          narration: true,
        },
        {
          speaker: '我',
          text: '您到底是谁？',
        },
        {
          speaker: '老人',
          text: '一个以前没把车开好的人。',
        },
        {
          text: '他说完，把收音机关掉，又打开。沙沙声里，报站器重复了一遍“井儿胡同”。司机依旧没有回头，仿佛这个名字与他无关。',
          narration: true,
        },
        {
          text: '窗外的胡同越来越窄。我看见一户人家的窗台上晾着红辣椒，灯光把辣椒照得像一串小灯笼。下一秒，那户人家不见了，换成了一堵贴满小广告的墙。',
          narration: true,
        },
      ],
      next: 'c1_arrive',
    },
    c1_arrive: {
      kind: 'dialogue',
      id: 'c1_arrive',
      chapter: 2,
      scene: 'ghost-stop',
      place: '井儿胡同',
      lines: [
        {
          text: '车停了。没有站台，没有候车亭，只有一棵歪脖子槐树和一块半人高的水泥牌子。牌子上糊着层层小广告，最底下露出两个刻得极深的字：井儿。',
          narration: true,
        },
        {
          text: '车门“哧”地打开。冷风灌进来，带着井水的腥气。',
          narration: true,
        },
        {
          text: '棕衣女人站起来，抱着那件织了一半的毛衣，慢慢走下车。她没有回头。',
          narration: true,
        },
        {
          text: '车里没有一个人按过下车铃。可是车门开了，像这辆车本来就该在这里停。',
          narration: true,
        },
        {
          text: '我回头去数人头。棕衣女人已经下了车；最后排的年轻女人不见了；老人还坐在原处，收音机贴着胸口。加上司机，车上只剩三个人。',
          narration: true,
        },
        {
          text: '来的时候，我分明记得车上有五个人。',
          narration: true,
        },
      ],
      next: 'c2_off',
    },
    c2_off: {
      kind: 'choice',
      id: 'c2_off',
      chapter: 2,
      scene: 'ghost-stop',
      place: '井儿胡同',
      lines: [
        {
          text: '老人坐在原处，收音机抱得更紧了。他的眼睛一直盯着我，像在等我做错事。',
          narration: true,
        },
        {
          text: '槐树后面是一条看不见底的胡同。胡同深处亮着一盏灯，黄得发旧。',
          narration: true,
        },
      ],
      prompt: '车门开着。我——',
      options: [
        {
          id: 'off',
          label: '跟下车。那个女人的毛衣上，有我很熟悉的味道。',
          hint: '违背老人的第一条警告。',
          next: 'c3_001',
          effects: { setFlags: ['gotOff'] },
        },
        {
          id: 'stay',
          label: '坐在车上。这里不对劲，离司机近一点更安全。',
          hint: '遵守老人的警告。',
          next: 'c2_stay1',
          effects: { setFlags: ['stayedBus'] },
        },
      ],
    },
    c2_stay1: {
      kind: 'dialogue',
      id: 'c2_stay1',
      chapter: 2,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '车门又“哧”地合上了。女人站在槐树下，身影被车灯拉得很长。她没有追车，也没有招手。她只是抬起手，把毛线的一头系在树枝上。',
          narration: true,
        },
        {
          text: '车重新开动。我盯着窗外的胡同，想记住路。可车只拐了一个弯，就又回到了那棵歪脖子槐树前。',
          narration: true,
        },
        {
          speaker: '报站器',
          text: '下一站，井儿胡同。',
        },
        {
          text: '还是那个站牌。还是那盏黄灯。棕衣女人已经不在了，树枝上多了一截红毛线，在风里轻轻晃。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '又绕回来了。',
        },
        {
          speaker: '我',
          text: '司机怎么还开？我们不是在原地转圈吗？',
        },
        {
          speaker: '老人',
          text: '你当是他想开？这车认路。它只认得那天晚上走过的路。',
        },
        {
          text: '我看向驾驶座。司机的肩膀很宽，制服后领磨破了，露出一小截灰白的衬衫。他握方向盘的姿势，和赵长顺一模一样。',
          narration: true,
        },
        {
          text: '“那司机是……”我没把话说完。老人把收音机贴到耳边，像没听见。',
          narration: true,
        },
        {
          text: '车窗外的街景开始重复。先是那棵歪脖子槐树，再是门口晒着白菜的院子，然后是那盏黄灯。第三次经过同一堵墙时，墙上多了一个用粉笔写的“正”字。',
          narration: true,
        },
        {
          text: '老人说，那是司机记的圈数。每绕一圈，他就添一笔。墙上的“正”字已经数不清有多少个，最新的那一笔还没干。',
          narration: true,
        },
        {
          text: '我问他，我们是不是已经死了。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '死了倒省心。怕的是半死不活，坐在车上，还当自己明天要上班。',
        },
        {
          text: '他说完，从兜里摸出一张月票。票面上的照片年轻得认不出是他，单位一栏印着“北京市公共交通总公司”。',
          narration: true,
        },
      ],
      next: 'c2_stay2',
    },
    c2_stay2: {
      kind: 'dialogue',
      id: 'c2_stay2',
      chapter: 2,
      scene: 'bus',
      place: '13 路末班',
      lines: [
        {
          text: '最后一排的年轻女人醒了。她揉了揉眼睛，问：“到了吗？”',
          narration: true,
        },
        {
          text: '没人回答。她看了看窗外，脸色一点点白下去。',
          narration: true,
        },
        {
          speaker: '年轻女人',
          text: '司机，开门。我要下去。',
        },
        {
          text: '司机没有动。车门自己开了。年轻女人跌跌撞撞地跑下去，脚步在胡同里越来越远，最后被一阵水声吞掉。',
          narration: true,
        },
        {
          text: '我这才发现，车厢里的人又少了一个。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '再不下去，下一回门开，就轮到你了。',
        },
      ],
      next: 'c2_stay3',
    },
    c2_stay3: {
      kind: 'dialogue',
      id: 'c2_stay3',
      chapter: 2,
      scene: 'bus',
      place: '13 路末班 · 第三次经过',
      lines: [
        {
          text: '车又停了。这一次，站牌上没有“井儿”两个字，只有一块锈得发红的小铁片。槐树还在，树下的红毛线不见了。',
          narration: true,
        },
        {
          text: '司机没有开门。他把手从方向盘上拿下来，搁在膝盖上，像终于承认这辆车不需要人开。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '我姓赵。以前开这条线。',
        },
        {
          text: '我没有接话。车窗外，胡同像一张被水泡皱的旧照片，墙皮一块块往下掉。远处有孩子在跳皮筋，唱的词我听不清。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '九九年十一月初七，我开末班。北新桥修路，调度让我绕井儿胡同。我嫌胡同窄，不想进。他说不进扣钱。',
        },
        {
          text: '他说得很慢，像在报一串已经背了很多年的站名。每说一句，车窗外的街景就往后退一年。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '车陷进井口，乘客都下来了。有个女人又回去找孩子。井壁塌的时候，我抓过她的手。她把手抽回去了。',
        },
        {
          speaker: '我',
          text: '那个孩子呢？',
        },
        {
          text: '老人看着后视镜。我也看过去。镜子里，最后一排靠窗坐着一个九岁的小孩，穿一只红布鞋，正低头玩自己的手指。',
          narration: true,
        },
        {
          text: '我下意识低头看自己的脚。两只鞋都在，鞋带却系成了小时候母亲教我的那种双结。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '那孩子后来被姥姥接走了。大人们说，忘了好。忘了，就能好好长大。',
        },
        {
          speaker: '我',
          text: '你认识我。',
        },
        {
          speaker: '赵长顺',
          text: '你一上车我就认出来了。你耳后那颗小痣，跟你妈一模一样。',
        },
        {
          text: '车厢里忽然传来一声很轻的哼唱。棕衣女人不在了，可她的毛衣还搭在座位上，竹针悬在半空，像有一双看不见的手在织。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '我不能替她叫名字。我欠她的。你要是想留下，就坐稳。下一站，她会亲自来接你。',
        },
        {
          text: '车缓缓开动。站牌、槐树、胡同口那盏黄灯，一样一样从窗外过去。前方不是路，是一片被雾吞掉的黑。',
          narration: true,
        },
        {
          text: '车窗上，我的脸和九岁的我叠在一起。成年人的轮廓慢慢退掉，剩下一个瘦小的孩子，眼睛睁得很大。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '你妈最后跟我说的一句话，是“别让孩子看见”。我们就都骗你，说她在车上睡着了。',
        },
        {
          text: '“可我一直醒着。”我说。',
          narration: true,
        },
        {
          text: '话出口，我才发现自己说的是“我”，不是“那个孩子”。老人点了点头，什么也没问。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '那天你发着烧，坐在最后一排。你妈把你从车里抱出来，塞给我，说先送孩子去医院。她自己又回去了。',
        },
        {
          speaker: '赵长顺',
          text: '我说我替她去找。她说不用，说那鞋是她纳的，她知道在哪儿。',
        },
        {
          text: '他停了一下，喉咙里像卡着一口痰。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '我抱着你往胡同口跑。跑到一半，听见后面“轰”的一声。你在我怀里哭，喊妈。我没敢回头。',
        },
        {
          text: '我看着老人。他的眼睛里没有泪，只有一种被磨平了的空。二十六年，他每天都在这个车厢里回到那一晚，却从来没有真正走回去过。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '后来车队给了你姥姥一笔钱。不多。你姥姥没要，只把你们娘俩的东西收走了。',
        },
        {
          speaker: '我',
          text: '那件毛衣呢？',
        },
        {
          speaker: '赵长顺',
          text: '不知道。可能烧了，可能还在哪个箱子里。你妈没织完，谁也没舍得拆。',
        },
        {
          text: '我忽然想起，家里那个旧樟木箱的底层，确实压着一团红线。姥姥去世后我没敢打开，搬家时整箱扔在了储物间。',
          narration: true,
        },
        {
          text: '“你妈手巧。”老人说，“缝纫社的人都叫她苏师傅。她给你做的鞋，鞋底纳得比别人的厚一倍。”',
          narration: true,
        },
        {
          text: '他说话时，前排的座位轻轻动了一下。棕衣女人的轮廓在暗处显出来，又散开，像玻璃上的一层哈气。',
          narration: true,
        },
      ],
      next: 'c2_stay_again',
    },
    c2_stay_again: {
      kind: 'choice',
      id: 'c2_stay_again',
      chapter: 2,
      scene: 'ghost-stop',
      place: '井儿胡同 · 第二次',
      lines: [
        {
          text: '槐树再次从窗外长出来。站牌上的“井儿”两个字像刚被雨水洗过。',
          narration: true,
        },
        {
          text: '车门开了。这一次，我听见胡同深处有人叫我的乳名。',
          narration: true,
        },
        {
          text: '叫声很耐心，不催也不急。它穿过槐树、墙头、雾和车门，落在我的耳朵里，像一只手轻轻拽住衣角。',
          narration: true,
        },
        {
          speaker: '远处的女人',
          text: '小满——回家吃饭了——',
        },
        {
          text: '我后颈的汗毛一根根立起来。那是北方深秋傍晚，母亲站在院门口喊孩子的声音。',
          narration: true,
        },
      ],
      prompt: '车门开着。',
      options: [
        {
          id: 'off',
          label: '这一次，下车。',
          hint: '如果一直坐下去，可能再也下不去。',
          next: 'c3_001',
          effects: { setFlags: ['gotOff'] },
        },
        {
          id: 'stay',
          label: '坐回十三排，把眼睛闭上。',
          hint: '只要不应声，只要不动，也许会到站。',
          next: 'c2_stay4',
        },
      ],
    },
    c2_stay4: {
      kind: 'dialogue',
      id: 'c2_stay4',
      chapter: 2,
      scene: 'ghost-stop',
      place: '槐树胡同 · 第三次停车',
      lines: [
        {
          text: '我没有动。车却又开了一站。这一次，窗外没有胡同，只有一盏孤零零的路灯，灯下立着真正的站牌：槐树胡同。',
          narration: true,
        },
        {
          text: '站牌是新的，白底蓝字，杆子上还缠着塑料膜。旁边的槐树却老得不像话，树皮裂开，树洞里塞着几枚硬币和一截红绳。',
          narration: true,
        },
        {
          text: '车门开了。冷风把雾吹进来，路灯的光落在我脚边。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '到了。快下去。',
        },
        {
          text: '他没有回头，声音却比刚才清楚。司机座上的那个人依旧一动不动，像一个摆在方向盘后面的影子。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '小满，跟妈回家吧。饺子快凉了。',
        },
        {
          text: '我闻见了醋味，还有刚出锅的面香。那味道从车门外的雾里飘进来，真实得让我胃里一阵发酸。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '别听。你妈不会包饺子。她那天买的是挂面。',
        },
        {
          text: '这句话像一根针，扎破了车门外那层热腾腾的香气。雾重新变冷，路灯发出电流不稳的嗡嗡声。',
          narration: true,
        },
        {
          text: '我想起姥姥说过，母亲包饺子总把盐放重，得就着凉水吃。她走后，家里再没人包过那种咸得发苦的饺子。',
          narration: true,
        },
        {
          text: '门外的声音还在叫。它没有催，只是把“小满”两个字一遍遍放在风里，像把一件旧衣服晾出去，等它自己干。',
          narration: true,
        },
        {
          text: '我忽然想起，母亲从来不叫我大名。她说林晚太生分，像老师点名。她只叫我小满，叫了九年。',
          narration: true,
        },
        {
          text: '九年有多短？短到我还没学会系鞋带，没学会一个人过马路，没学会在她不在的时候不想她。',
          narration: true,
        },
        {
          text: '我忽然很想问问赵长顺，这二十六年他是怎么过的。可话到嘴边，又觉得问不问都一样。我们都坐在同一辆车上，只是他比我早到了很久。',
          narration: true,
        },
        {
          text: '槐树胡同的灯还亮着。那是出胡同唯一的路。',
          narration: true,
        },
        {
          text: '我看向车门。站台是实的，路灯是实的，风里的煤灰也是实的。可那声“回家”像一根细线，拴在我的脚踝上。',
          narration: true,
        },
        {
          text: '赵长顺没有再催。他低下头，把那台收音机调到一个没有台的频率，沙沙声填满了整节车厢。',
          narration: true,
        },
        {
          text: '我看见站台上自己的影子。影子比我矮，穿一件旧棉袄，脚上只有一只红布鞋。它朝我抬起手，掌心向上，像在要一样东西。',
          narration: true,
        },
        {
          text: '车门没有关。风把那个孩子的头发吹起来，也把我额前的碎发吹起来。我们隔着一步远的距离，谁也没有说话。',
          narration: true,
        },
        {
          text: '孩子抬起手，把一只红布鞋递给我。鞋底绣着“满”字。我伸手去接，指尖碰到鞋面的那一瞬，听见母亲在雾里笑了一声。',
          narration: true,
        },
        {
          text: '“穿上吧。”她说，“外头冷。”',
          narration: true,
        },
        {
          text: '我的脚自己往前迈了半步。鞋底踩在车厢地板上，发出很轻的一声响。然后我停住了。',
          narration: true,
        },
        {
          text: '赵长顺在我身后说：“想清楚。下了这辆车，你就得用两条腿走回去。”',
          narration: true,
        },
        {
          text: '“回哪儿？”',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '回你明天还要上班的地方。回没有她的地方。',
        },
        {
          text: '车门外的孩子还举着鞋。她的脸在雾里模模糊糊，像我记忆中母亲年轻时的样子，又像镜子里的我自己。',
          narration: true,
        },
      ],
      next: 'c2_stay_final',
    },
    c2_stay_final: {
      kind: 'choice',
      id: 'c2_stay_final',
      chapter: 2,
      scene: 'ghost-stop',
      place: '槐树胡同 · 车门开着',
      lines: [
        {
          text: '第三声钟还没有响。车门开着，车外的风里有雾、有土，有活人世界的气味。',
          narration: true,
        },
      ],
      prompt: '我该——',
      options: [
        {
          id: 'answer',
          label: '应一声，走下车，去吃那顿不存在的饺子。',
          hint: '门外的声音太像家了。',
          next: 'ending_lost_stay',
          effects: { setFlags: ['answered'] },
        },
        {
          id: 'run',
          label: '不看车门，沿着槐树胡同的路灯跑。',
          hint: '赵长顺说，往亮的地方走。',
          next: 'ending_survive_bus',
        },
        {
          id: 'sit',
          label: '坐回十三排，抱住膝盖，等车门自己关上。',
          hint: '你不想选她，也不敢选外面的世界。',
          next: 'c2_lost_loop',
        },
      ],
    },
    c2_lost_loop: {
      kind: 'dialogue',
      id: 'c2_lost_loop',
      chapter: 2,
      scene: 'lost-bus',
      place: '13 路末班',
      lines: [
        {
          text: '我闭上眼，数自己的呼吸。一、二、三。车在动，像一只很大的动物在黑暗里翻身。',
          narration: true,
        },
        {
          text: '不知道过了多久，我听见有人上车。投币箱响了一声，又一声。',
          narration: true,
        },
        {
          text: '“师傅，这车到北新桥吗？”一个年轻的声音问。',
          narration: true,
        },
        {
          text: '我睁开眼。车厢里亮着一盏惨白的顶灯。驾驶座上没有人。后视镜里，映出十三排靠窗的我。',
          narration: true,
        },
        {
          text: '车门外站着一个抱着电脑包的加班族，头发被雨打湿了。他看着我，像看着一个可以问路的人。',
          narration: true,
        },
        {
          text: '我想告诉他别上来。可我的嘴张开，发出的却是司机的声音：',
          narration: true,
        },
        {
          speaker: '我',
          text: '上不上？后头没车了。',
        },
        {
          text: '年轻人上了车，投了一枚硬币。硬币落进箱子，没有声音。他挑了我斜前方的座位，把电脑包放在腿上。',
          narration: true,
        },
        {
          text: '“师傅，这车到北新桥吗？”他又问了一遍。',
          narration: true,
        },
        {
          text: '这一次，我听见自己的声音从驾驶座那边传过来，隔着一整节车厢，很远。',
          narration: true,
        },
        {
          speaker: '司机',
          text: '到。北新桥嘛，到不了。',
        },
        {
          text: '年轻人愣了一下。他低头看手机，屏幕上映出一张疲惫的脸。他没有再问，只把目光移向窗外。',
          narration: true,
        },
        {
          text: '我知道他会在井儿胡同下车。我知道他会看见红毛衣、门墩和那口井。我也知道，他可能比我聪明，可能不会应声。',
          narration: true,
        },
        {
          text: '可这些都不重要了。车门关上，车灯暗下去，他的座位在黑暗里慢慢变成十三排。',
          narration: true,
        },
        {
          text: '棕衣女人坐到我旁边，把红毛衣展开，盖在我们两个人的膝盖上。她的手很暖，暖得像小时候焐在被子里的热水袋。',
          narration: true,
        },
        {
          text: '“妈，”我说，“我冷。”',
          narration: true,
        },
        {
          text: '这个称呼出口时，我听见很远的地方有人轻轻哭了一声。也可能是车轮碾过井盖的声音。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '别看了。下回他问路，你就说不知道。',
        },
        {
          text: '我点点头。窗外的北新桥站牌一闪而过，像从来没有存在过。',
          narration: true,
        },
        {
          text: '车又开了一站。年轻人还在井儿胡同，还没有回来。我知道他迟早会回来，就像我知道这辆车永远不会真正到站。',
          narration: true,
        },
        {
          text: '我试着回忆自己是怎么上的车。站牌、雨、投币箱、那个说“到不了”的司机。每个画面都很清楚，却像从别人的记忆里借来的。',
          narration: true,
        },
        {
          text: '老人说：“别想了。想多了，就真成你的了。”',
          narration: true,
        },
        {
          text: '我低头看自己的手。掌心里有一道浅浅的疤，是九岁那年被缝纫机针扎的。它越来越淡，像被水一点点冲走。',
          narration: true,
        },
        {
          text: '车又经过井儿胡同。这一次，站台上站着两个人：一个年轻女人和她的孩子。女人弯下腰给孩子系鞋带，孩子手里攥着一只红布鞋，正仰头看我。',
          narration: true,
        },
        {
          text: '我想喊她们别上车。可车窗太厚，我的声音被发动机吞掉了。',
          narration: true,
        },
        {
          text: '车门打开，她们还是上来了。女人经过我身边，带起一小股樟木箱和雨水的味道。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '麻烦让让，孩子脚冷。',
        },
        {
          text: '我让开。她们坐进十三排，孩子靠窗，女人坐在外面，低头织起一件永远织不完的红毛衣。',
          narration: true,
        },
        {
          text: '车厢里安静下来。我忽然明白，这辆车上的每一个空座，都曾经坐过一个没能下车的人。',
          narration: true,
        },
      ],
      next: 'ending_lost_ride',
    },
    c3_001: {
      kind: 'dialogue',
      id: 'c3_001',
      chapter: 3,
      scene: 'alley',
      place: '井儿胡同',
      lines: [
        {
          text: '脚一落地，身后的车门就合上了。车没有开走，只是熄了灯，像一块黑色的石头停在槐树底下。',
          narration: true,
        },
        {
          text: '胡同比从车窗里看起来深得多。两边的灰墙很高，墙头长着枯草，门楼上的瓦当缺了半边。风从门缝里钻出来，带着煤炉子和受潮木头的味道。',
          narration: true,
        },
        {
          text: '路灯的电线在头顶绕来绕去，像一张没收好的渔网。每走过一根电线杆，我的影子就被拉长一次，又缩回去。',
          narration: true,
        },
        {
          text: '胡同口有一个公共水管，下面摆着接水的铁桶。水龙头没拧紧，一滴一滴往下落。那声音在雾里被放得很大，像有人在数数。',
          narration: true,
        },
        {
          text: '棕衣女人走在前面，红毛衣搭在臂弯里。她的脚步很轻，布鞋底踩在青砖上几乎没有声音。',
          narration: true,
        },
        {
          text: '一位老太太坐在门槛上剥白菜，听见动静抬起头。她的眼睛越过我，落在棕衣女人身上，又很快低下去，像什么都没看见。',
          narration: true,
        },
        {
          text: '我经过她身边时，她忽然说：“姑娘，几点了？”',
          narration: true,
        },
        {
          text: '我掏出手机。屏幕停在二十三点四十一分，日期是 1999 年 11 月 7 日。',
          narration: true,
        },
        {
          text: '“快十二点了。”我说。老太太点点头，继续剥白菜。她脚边的菜叶上，落着一层薄薄的霜。',
          narration: true,
        },
        {
          text: '老人从后面跟上来。他的收音机发出细碎的电流声，在安静的胡同里格外响。',
          narration: true,
        },
        {
          text: '墙根下码着一摞蜂窝煤，被雨淋得发亮。谁家的窗台上搁着半瓶酸奶，瓶口盖着一张纸。再往里走，路灯没有了，只有门缝里漏出的几线黄光。',
          narration: true,
        },
        {
          text: '棕衣女人的红毛衣在雾里忽隐忽现。她走得不快，却总和我隔着十来步。我快她也快，我停她也停，像一个不肯被追上的人。',
          narration: true,
        },
        {
          text: '一辆二八大杠靠在墙边，车把上挂着塑料袋，里面是两根蔫了的葱。胡同深处有人咳嗽，又像是井里传上来的回声。',
          narration: true,
        },
        {
          text: '经过一户人家时，我听见收音机里在播晚间新闻。女播音员报出日期：一九九九年十一月七日。我停下脚步，再听时，新闻已经变成了天气预报。',
          narration: true,
        },
      ],
      next: 'c3_002',
    },
    c3_002: {
      kind: 'dialogue',
      id: 'c3_002',
      chapter: 3,
      scene: 'courtyard',
      place: '旧院门口',
      lines: [
        {
          text: '胡同拐了一个弯，前面忽然开阔了一点。一座旧院门半掩着，门前的青石门墩缺了一角。',
          narration: true,
        },
        {
          text: '我站住了。',
          narration: true,
        },
        {
          text: '那门墩太熟悉了。小时候我总坐在上面等母亲下班，夏天是凉的，冬天要垫一张旧报纸。缺掉的那一角，是有一年我拿小锤子敲的，挨了一顿骂。',
          narration: true,
        },
        {
          text: '棕衣女人的红线从门墩上拖过去，缠住了一根翘起的木刺。',
          narration: true,
        },
        {
          text: '门楣上原本应该挂着门牌，现在只剩两个锈黑的钉眼。院子里有切菜的案板声，有收音机里的京戏，还有一个孩子笑着跑过。那些声音都很正常，正常得让我不敢推门。',
          narration: true,
        },
        {
          text: '我忽然想起，小时候我家院门口也有这样一只门墩。母亲下班回来，会坐在上面择韭菜，等我从胡同口跑回来。',
          narration: true,
        },
      ],
      next: 'c3_doorstone',
    },
    c3_doorstone: {
      kind: 'choice',
      id: 'c3_doorstone',
      chapter: 3,
      scene: 'courtyard',
      place: '旧院门口',
      lines: [
        {
          text: '门里没有人。院子里却亮着一盏灯，灯光从门缝底下漏出来，黄黄的，像一块被压在玻璃下的旧糖纸。',
          narration: true,
        },
      ],
      prompt: '我蹲在门墩前，手指悬在石面上。',
      options: [
        {
          id: 'inspect',
          label: '把红线拨开，摸一摸缺角的门墩。',
          hint: '有些刻痕会等人很久。',
          next: 'c3_doorstone_inspect',
          effects: { addClues: ['doorstone'] },
        },
        {
          id: 'follow',
          label: '先跟上前面的女人。',
          hint: '院子里的灯在闪，像随时会灭。',
          next: 'c3_follow_woman',
        },
      ],
    },
    c3_doorstone_inspect: {
      kind: 'dialogue',
      id: 'c3_doorstone_inspect',
      chapter: 3,
      scene: 'courtyard',
      place: '旧院门口',
      lines: [
        {
          text: '石面冰凉。我摸到缺角内侧有几道浅浅的横线，像用钉子刻的。',
          narration: true,
        },
        {
          text: '第一道线旁边刻着“七岁”。第二道是“八岁”。第三道最高，旁边刻着：',
          narration: true,
        },
        {
          speaker: '门墩',
          text: '小满 九岁 九九·十',
        },
        {
          text: '九九年的十月。我九岁。我的乳名叫小满。',
          narration: true,
        },
        {
          text: '记忆像一口被掀开的井，冷气从很深的地方冒上来。母亲蹲在这里，用一把旧剪刀的尖给我刻身高线。她穿着一件棕色的外套，袖口磨得起球。',
          narration: true,
        },
        {
          text: '“等你过十岁生日，”她说，“妈给你织件红毛衣。”',
          narration: true,
        },
        {
          text: '我记得自己问她要什么颜色的。她低头想了想，说红色吧，冬天穿，站在雪地里好找。',
          narration: true,
        },
        {
          text: '她那时在一家街道缝纫社上班。每天回家，指头上都缠着红线头。我嫌她手粗，不肯让她牵，她就笑着在后面跟着，替我拎书包。',
          narration: true,
        },
        {
          text: '这些事我明明忘了很多年。此刻它们像被人从井底一件件捞上来，湿淋淋地摆在面前。',
          narration: true,
        },
        {
          text: '我猛地站起来。院门“吱呀”一声，自己开大了一点。',
          narration: true,
        },
      ],
      next: 'c3_well_arrive',
    },
    c3_follow_woman: {
      kind: 'dialogue',
      id: 'c3_follow_woman',
      chapter: 3,
      scene: 'alley',
      place: '槐树后',
      lines: [
        {
          text: '我绕过门墩，跟着那截红毛线往胡同深处走。毛线在墙角拐了个弯，把我带到一棵老槐树后面。',
          narration: true,
        },
        {
          text: '门墩上的刻痕在我脑子里闪了一下。我没看清那是什么，只觉得手心发凉。',
          narration: true,
        },
        {
          text: '女人站在一口被水泥封住的井旁。她背对着我，肩膀一起一伏，像是在笑，又像是在喘气。',
          narration: true,
        },
        {
          text: '走近了才看清，井口周围的水泥地有一道细缝，从井沿一直裂到墙根。缝里渗出暗色的水，在月光下泛着油一样的亮。',
          narration: true,
        },
        {
          text: '我蹲下去，闻见一股很淡的煤油味。那味道让我想起小时候停电，母亲点煤油灯，灯芯噼啪响，把她的影子投在墙上，很大，很暖。',
          narration: true,
        },
      ],
      next: 'c3_well_arrive',
    },
    c3_well_arrive: {
      kind: 'dialogue',
      id: 'c3_well_arrive',
      chapter: 3,
      scene: 'well',
      place: '井台',
      lines: [
        {
          text: '井在院子最里面，离正房只有几步远。井口盖着厚厚的水泥板，水泥上压着一块磨盘，磨盘中央被凿了一个拳头大的孔。',
          narration: true,
        },
        {
          text: '槐树的根从墙根下拱出来，绕着井台长了一圈。越靠近井，空气越冷，泥土的颜色也越深。',
          narration: true,
        },
        {
          text: '水泥盖边缘有一圈发黑的防水胶，像是后来补的。井台边的墙面上贴着一张褪色通知，只剩“危险”“勿靠近”几个字。通知下方有一道孩子用粉笔画的身高线，被雨水冲得只剩半截。',
          narration: true,
        },
        {
          text: '女人把毛衣放在井沿上。袖子只织了一半，竹针还别在腋下的位置。她蹲下去，把脸贴在水泥盖的孔边，很轻地说了一句话。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '袖子还没收口，你先穿着。',
        },
        {
          text: '她站起来，转身看着我。那张脸在灯下很模糊，像一张被水泡过的照片。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '小满，妈去去就回。',
        },
        {
          text: '她从我身边走过去，带起一小股樟木箱和雨水的味道。我没有伸手拦她。',
          narration: true,
        },
        {
          text: '我转过身时，院门口已经空了。井台上的红毛衣还在，竹针轻轻晃着，像刚有人把它放下。',
          narration: true,
        },
      ],
      effects: { addClues: ['sweater'] },
      next: 'c3_zhao',
    },
    c3_zhao: {
      kind: 'dialogue',
      id: 'c3_zhao',
      chapter: 3,
      scene: 'well',
      place: '井台',
      lines: [
        {
          text: '老人不知什么时候站在了院门口。他没有进来，只在门槛外站着，像被一道看不见的线挡住了。',
          narration: true,
        },
        {
          speaker: '我',
          text: '您认识她。',
        },
        {
          text: '不是问句。老人的肩膀塌了一下。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '我认识那件毛衣。二十多年了，毛线都没褪色。',
        },
        {
          speaker: '我',
          text: '那她为什么每年都回来？',
        },
        {
          text: '老人没有马上回答。他抬头看井，又看那件红毛衣，嘴唇动了几次，像在把一句话反复咽下去。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '不是她回来。是这趟车回不来。车回不来，人就只能跟着车走。',
        },
        {
          speaker: '我',
          text: '您怎么知道得这么清楚？',
        },
        {
          text: '他怀里的收音机突然自己响了。这次没有沙沙声，播音员的声音清楚得像就站在院子里。',
          narration: true,
        },
      ],
      next: 'c3_radio',
    },
    c3_radio: {
      kind: 'choice',
      id: 'c3_radio',
      chapter: 4,
      scene: 'well',
      place: '井台 · 23:40',
      lines: [
        {
          speaker: '收音机',
          text: '……十三路末班车，因北新桥施工，临时改行井儿胡同。请沿线乘客注意脚下……',
        },
        {
          text: '播音员重复着同一句话。第二次重复时，背景里多了一个孩子的哭声。第三次重复时，我听见母亲的声音从收音机里传出来。',
          narration: true,
        },
        {
          speaker: '收音机里的女人',
          text: '车上还有个孩子，叫林晚。麻烦谁帮我看着点，别让她下车。',
        },
        {
          text: '老人伸手去关收音机，手抖得对不准旋钮。',
          narration: true,
        },
      ],
      prompt: '收音机还在响。',
      options: [
        {
          id: 'listen',
          label: '按住老人的手，听完这段广播。',
          hint: '这声音比你记忆里更真实。',
          next: 'c3_radio_on',
          effects: { addClues: ['radio'] },
        },
        {
          id: 'stop',
          label: '帮他把收音机关掉。',
          hint: '有些声音听下去，就再也拔不出来。',
          next: 'c3_radio_off',
        },
      ],
    },
    c3_radio_on: {
      kind: 'dialogue',
      id: 'c3_radio_on',
      chapter: 4,
      scene: 'well',
      place: '井台 · 23:41',
      lines: [
        {
          text: '老人的手背很凉，皮肉底下全是硬邦邦的筋。他没有甩开我，只是把脸别到一边。',
          narration: true,
        },
        {
          speaker: '收音机',
          text: '调度呼叫十三路，调度呼叫十三路。末班车现在到哪儿了？',
        },
        {
          speaker: '收音机里的男人',
          text: '在井儿胡同。后轮陷了，乘客都下来了。车上还有个孩子……',
        },
        {
          text: '录音到这里断了一下。再响起来时，是一个女人在很远的地方喊：“小满，别过来。”',
          narration: true,
        },
        {
          text: '然后就是水声。先是哗啦一下，接着是像有人在泥里翻身的闷响。',
          narration: true,
        },
      ],
      next: [
        {
          when: { anyFlags: ['askedDriver', 'returnedShoe'] },
          next: 'c3_confession',
        },
        { next: 'c3_radio_doubt' },
      ],
    },
    c3_radio_doubt: {
      kind: 'dialogue',
      id: 'c3_radio_doubt',
      chapter: 4,
      scene: 'well',
      place: '井台 · 23:43',
      lines: [
        {
          text: '我等着录音继续，老人却猛地按下了停止键。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '后面没了。带子洗过好多回，早花了。',
        },
        {
          speaker: '我',
          text: '您知道那个孩子是谁。',
        },
        {
          speaker: '老人',
          text: '我只知道那天我少踩了一脚刹车。别的，知道也没用。',
        },
        {
          text: '他把收音机转到背后，像藏起一件见不得人的东西。',
          narration: true,
        },
      ],
      next: 'c4_001',
    },
    c3_radio_off: {
      kind: 'dialogue',
      id: 'c3_radio_off',
      chapter: 4,
      scene: 'well',
      place: '井台 · 23:42',
      lines: [
        {
          text: '旋钮“啪”地一响，院子里安静下来。老人长长地吐了一口气，像刚从水里被捞上来。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '谢谢。',
        },
        {
          speaker: '我',
          text: '那里面说的是什么？',
        },
        {
          speaker: '老人',
          text: '旧广播。年年这时候都串台。别问了，问多了，井会记住你。',
        },
        {
          text: '他往井口看了一眼，又飞快地把目光移开。',
          narration: true,
        },
        {
          text: '院子里静下来。井盖下面传来一声很轻的叩击，像有人用指关节敲了三下门。',
          narration: true,
        },
        {
          text: '老人说：“那是水响。”',
          narration: true,
        },
        {
          text: '我没告诉他，水响不会按三下停一停，再敲三下。',
          narration: true,
        },
        {
          text: '槐树的影子落在井台上，慢慢收拢，像一张网。',
          narration: true,
        },
        {
          text: '我忽然很想知道，那盘录音的后半段到底是什么。可收音机已经黑了屏。有些声音，关掉就再也找不回来。',
          narration: true,
        },
        {
          text: '老人把那台机器抱在怀里，手指在裂开的外壳上一下一下地摩挲，像在哄一个睡着的孩子。',
          narration: true,
        },
        {
          text: '我们谁都没有再说话。井台上方的月亮被云遮住，院墙上的霜亮了一瞬，又暗下去。',
          narration: true,
        },
      ],
      next: 'c4_001',
    },
    c3_confession: {
      kind: 'dialogue',
      id: 'c3_confession',
      chapter: 4,
      scene: 'well',
      place: '井台 · 23:44',
      lines: [
        {
          text: '老人沉默了很久。远处传来一声闷响，像有人在地底下关了一扇门。',
          narration: true,
        },
        {
          speaker: '老人',
          text: '我姓赵，赵长顺。那天晚上，十三路的末班车是我开的。',
        },
        {
          speaker: '赵长顺',
          text: '北新桥路面施工，车队让绕行。井儿胡同窄，我本来不想进。可调度说，不进就扣全月的钱。',
        },
        {
          text: '他把收音机抱在怀里，像抱着一块很重的石头。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '车一进胡同，右边轮子就陷了。那井盖早烂了，上头浮着一层土。我先让乘客下车，回头看见你妈又上去了。',
        },
        {
          speaker: '我',
          text: '她上去干什么？',
        },
        {
          speaker: '赵长顺',
          text: '找你。你说脚冷，鞋掉了一只。她非回去拿。我把你抱下车的时候，你还发着烧，嘴里一直叫妈。',
        },
        {
          text: '我听见自己的呼吸变得很响。那些被大人用“你妈去南方了”糊住的年月，在这一刻裂开一道口子。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '井壁塌得很快。我们拉住了她的手，没拉住人。天亮前，车队来人，把井填了。报上去说是路面塌陷，无人伤亡。',
        },
        {
          speaker: '赵长顺',
          text: '你姥姥把你接走，说你在车上睡着了，什么都没看见。后来大家就都当什么都没发生。',
        },
        {
          text: '他说到这儿，忽然抬手抹了一把脸。那只手抖得厉害，像还握着二十六年前的方向盘。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '车队让我写检查，写完就调去看仓库。没过两年，线路改号，井儿胡同从图上抹了。再后来，连知道这事的人都搬走了。',
        },
        {
          speaker: '赵长顺',
          text: '我退休以后，每年今天都来坐一趟。我想着，万一哪年她上来，我能把车停稳一回。可每回看见她坐在那儿织毛衣，我都不敢认。',
        },
        {
          text: '他说的“她”，是那个穿棕色外套的女人，还是二十多年前的我的母亲？我没有问。井台边的风把红毛衣的线头吹起来，又轻轻放下。',
          narration: true,
        },
      ],
      effects: { addClues: ['confession', 'name'], setFlags: ['confession'] },
      next: 'c4_001',
    },
    c4_001: {
      kind: 'dialogue',
      id: 'c4_001',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:47',
      lines: [
        {
          text: '井里忽然有了声音。',
          narration: true,
        },
        {
          text: '不是水声，也不是风声。是一个女人在井底喊我，声音隔着厚厚的水泥板，闷闷的，却每一个字都很清楚。',
          narration: true,
        },
        {
          speaker: '井里的女人',
          text: '小满，是你吗？',
        },
        {
          text: '我僵在原地。那个声音太像了。像到我甚至闻见小时候家里的蜂窝煤味，和母亲手上永远洗不掉的肥皂粉味。',
          narration: true,
        },
        {
          speaker: '井里的女人',
          text: '过来，让妈看看。冻坏了吧？',
        },
        {
          text: '井盖中央的孔里，慢慢渗出一线白光。',
          narration: true,
        },
        {
          text: '白光里浮起一层很薄的灰。灰落在井沿上，拼出一行歪歪扭扭的字，像孩子用粉笔写的：妈妈。',
          narration: true,
        },
        {
          text: '风一吹，那两个字就散了。',
          narration: true,
        },
        {
          text: '我想起她走的那天早上。她蹲在门口给我系鞋带，手指冻得通红，还笑着说晚上回来包饺子。后来我在姥姥家吃了很多年的饺子，却再也想不起她包的是什么馅。',
          narration: true,
        },
        {
          text: '白光在孔里聚成一小团，像一只睁开的眼睛。',
          narration: true,
        },
      ],
      next: 'c4_answer',
    },
    c4_answer: {
      kind: 'choice',
      id: 'c4_answer',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:48',
      lines: [
        {
          text: '赵长顺在我身后急促地吸了一口气。他的手按上我的肩膀，又像被烫到一样缩回去。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '别应。姑娘，别应。',
        },
        {
          text: '可那是她的声音。二十六年了，我终于又听见她叫我。',
          narration: true,
        },
      ],
      prompt: '井底的声音又叫了一声“小满”。',
      options: [
        {
          id: 'answer',
          label: '应一声：“妈，我在。”',
          hint: '你等这声呼唤等了太多年。',
          next: 'ending_lost_answer',
          effects: { setFlags: ['answered'] },
        },
        {
          id: 'silence',
          label: '咬住舌尖，不出声。',
          hint: '老人的警告还在耳边。',
          next: 'c4_silence',
        },
      ],
    },
    c4_silence: {
      kind: 'dialogue',
      id: 'c4_silence',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:49',
      lines: [
        {
          text: '我把指甲掐进掌心。血腥味在嘴里漫开，我没有出声。',
          narration: true,
        },
        {
          text: '井里的声音停了。过了一会儿，它换了另一种叫法，不再像母亲，像很多人一起从很深的地方念我的名字。',
          narration: true,
        },
        {
          speaker: '井',
          text: '林晚。林晚。林晚。',
        },
        {
          text: '赵长顺把我往后拽了一步。井盖上的白光晃了晃，灭了。',
          narration: true,
        },
        {
          text: '“它记住你了。”老人声音发颤，“你刚才要是应了，就替她下去了。”',
          narration: true,
        },
        {
          text: '我问他，如果不应，是不是就能走。他摇头，说井记性不好，记不住活人的名字。可它记得住每一个愿意回头的人。',
          narration: true,
        },
        {
          text: '院子里的灯闪了两下。我看见自己的影子被拉得很长，一直拖到井口，像一个已经躺下去的人。',
          narration: true,
        },
        {
          text: '空气里有股很淡的线香。井台边放着一只搪瓷缸，缸里的水结了薄冰，冰面下压着一片红纸。',
          narration: true,
        },
      ],
      next: [
        {
          when: { allClues: ['radio'], noneFlags: ['confession'] },
          next: 'c4_confession',
        },
        {
          when: { allClues: ['radio'] },
          next: 'c4_reveal',
        },
        { next: 'c4_partial' },
      ],
    },
    c4_confession: {
      kind: 'dialogue',
      id: 'c4_confession',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:50',
      lines: [
        {
          text: '赵长顺看着井口，像终于被什么压垮了。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '我姓赵，赵长顺。那天晚上的车，是我开的。',
        },
        {
          text: '他断断续续地讲下去。北新桥施工，车队让绕行；井盖烂了；车陷了；所有人都下去了，只有母亲又回到车上。为了给我拿那只红布鞋。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '井壁塌的时候，我们抓着她的手腕。她把手抽回去了。她说，先抱孩子。',
        },
        {
          text: '他讲完，整个人像矮了一截。井盖下面有很轻的抓挠声，一下，又一下，然后停了。',
          narration: true,
        },
        {
          text: '车队报上去的“路面塌陷、无人伤亡”，就是这件事的全部官方记录。二十六年，一口井，一条命，被填进了水泥。',
          narration: true,
        },
      ],
      effects: { addClues: ['confession', 'name'], setFlags: ['confession'] },
      next: 'c4_reveal',
    },
    c4_reveal: {
      kind: 'dialogue',
      id: 'c4_reveal',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:51',
      lines: [
        {
          text: '“它每年都开一趟。”赵长顺说，“从那天起，十三路就再没有北新桥这一站。可到了十一月初七，末班车还是会从终点站后头开出来。”',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '车是给没名字的人开的。上了车，听见名字别应。应了，就把自己的名字留在井里，替它接着开。',
        },
        {
          speaker: '我',
          text: '您为什么还在车上？',
        },
        {
          speaker: '赵长顺',
          text: '我每年都来。想着哪年能把她叫出来。可我没那个胆子应声，也没那个脸叫她的名字。',
        },
        {
          text: '他抬头看我。这一回，他的眼睛里有了点活人的光。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '你不一样。你是她留在外头的名字。',
        },
        {
          text: '我忽然想起，他从一开始就知道我会在这辆车上。他抱着收音机坐在前排，不是在等末班车，是在等我。',
          narration: true,
        },
        {
          speaker: '我',
          text: '你是故意上车的。你知道我会来。',
        },
        {
          speaker: '赵长顺',
          text: '每年今天，车都会接一个人。有时候是你这样的孩子，有时候是当年签过字的人。今年轮到你了。',
        },
        {
          text: '“那怎么才算完？”我问。',
          narration: true,
        },
        {
          text: '赵长顺指了指井沿上的红毛衣，又指了指我手里的车票。他说，东西是死的，名字是活的。井收了东西，就得还一个名字。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '得有人把她的名字叫出来，把属于她的东西还回去。井要一个说法。可这说法一给，它就要拿你一样东西。',
        },
        {
          speaker: '我',
          text: '拿什么？',
        },
        {
          speaker: '赵长顺',
          text: '一个愿意一直记着她的人。',
        },
        {
          text: '我没有听懂。那时候我还不懂，井要的不是命，是记忆。一个人只要还替井底的人记着，井底的人就永远走不了。',
          narration: true,
        },
        {
          text: '我低头看井沿上的红毛衣。袖口只织了一半，线头从竹针上垂下来，一直垂进井盖的孔里。',
          narration: true,
        },
      ],
      next: 'c4_sweater',
    },
    c4_partial: {
      kind: 'dialogue',
      id: 'c4_partial',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:51',
      lines: [
        {
          text: '赵长顺知道些什么，但他把那些话咽了回去。就像这条胡同里的每一扇门，明明亮着灯，却谁都不肯打开。',
          narration: true,
        },
        {
          text: '井里的声音不再叫我的名字。它改成轻轻地哼一支歌，调子很旧，像母亲哄孩子睡觉时哼的。',
          narration: true,
        },
        {
          text: '我盯着井沿上的红毛衣。袖口只织了一半，线头从竹针上垂下来，一直垂进井盖的孔里。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '走吧。钟快响了。别在这儿待着。',
        },
      ],
      next: 'c4_sweater',
    },
    c4_sweater: {
      kind: 'dialogue',
      id: 'c4_sweater',
      chapter: 5,
      scene: 'well',
      place: '井台 · 23:54',
      lines: [
        {
          text: '我把红毛衣拿起来。毛线比看上去重，里面裹着两枚竹针和一小团没织完的线。',
          narration: true,
        },
        {
          text: '袖口内侧用白线缝了一个很小的名字：小满。',
          narration: true,
        },
        {
          text: '那一瞬间，井底传来一声很轻的叹息。像有人终于把憋了很多年的一口气吐了出来。',
          narration: true,
        },
        {
          text: '赵长顺伸手碰了碰毛衣的袖口，又缩回去。他说这颜色他记得，那年厂里发过一批处理毛线，只有这一种红。苏慧排了一下午队，买了半斤。',
          narration: true,
        },
        {
          text: '“她说孩子长得快，袖子要织长一点，来年还能穿。”老人说。',
          narration: true,
        },
        {
          text: '我把毛衣抱在怀里。它比一件衣服重得多，像抱着一个人没来得及过完的冬天。',
          narration: true,
        },
        {
          text: '远处，旧城方向传来第一声钟响。',
          narration: true,
        },
        {
          text: '赵长顺的脸色变了。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '走。车要开了。第三声之前，必须到槐树胡同。',
        },
      ],
      next: 'c5_001',
    },
    c5_001: {
      kind: 'dialogue',
      id: 'c5_001',
      chapter: 6,
      scene: 'return',
      place: '胡同 · 23:56',
      lines: [
        {
          text: '我们往胡同口跑。来时觉得很深的路，回去时却像被人抽短了。两边的门楼一扇扇退过去，每扇门后面都亮着同样的黄灯。',
          narration: true,
        },
        {
          text: '第二声钟响的时候，我看见了那辆 13 路。它停在槐树底下，车门开着，里面黑得像一张嘴。',
          narration: true,
        },
        {
          text: '棕衣女人站在车门前。她的脸在灯下清楚了一点，又好像更模糊了。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '小满，上车吧。外头冷。',
        },
        {
          text: '赵长顺在我身后停住了。他喘得很厉害，像是把二十多年的路都跑完了。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '我上不去了。你记住，槐树胡同的灯还亮着。往亮的地方走，别回头。',
        },
        {
          text: '我回头看。槐树胡同口确实有一盏路灯，灯光被雾气裹着，像一粒泡在水里的黄豆。',
          narration: true,
        },
        {
          text: '我问赵长顺，他为什么不走。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '我试过。走到胡同口，脚就自己拐回来了。坐过这趟车的人，脚都认路。',
        },
        {
          text: '他把那台收音机塞进我怀里。机器很轻，外壳裂了，里面却还有声音，像藏着一整条深夜的线路。',
          narration: true,
        },
        {
          speaker: '赵长顺',
          text: '要是你还能出得去，替我把这个带出去。别让它再唱了。',
        },
        {
          text: '我攥着毛衣和车票，站在车门与井台之间。雾里透出路灯昏黄的一小团光，像有人把一扇门推开了一条缝。',
          narration: true,
        },
        {
          text: '赵长顺没有跟上来。他的收音机落在地上，天线指向槐树胡同口，像一根很小的路标。',
          narration: true,
        },
        {
          text: '井的方向，第三声钟还没有落下。',
          narration: true,
        },
      ],
      next: [
        {
          when: {
            allClues: ['ticket', 'radio', 'confession', 'sweater'],
          },
          next: 'c5_gate_truth',
        },
        { next: 'c5_gate_blind' },
      ],
    },
    c5_gate_truth: {
      kind: 'choice',
      id: 'c5_gate_truth',
      chapter: 6,
      scene: 'return',
      place: '槐树胡同 · 第三声钟前',
      lines: [
        {
          text: '我知道井要的是什么了。它不要命，它要一个愿意记住的人。只要有人替它记着，那些名字就永远沉在底下。',
          narration: true,
        },
        {
          text: '我也知道，赵长顺为什么每年都上车，却每年都不敢叫出她的名字。',
          narration: true,
        },
        {
          text: '我手里有一张 1999 年的旧车票，一张录着那晚广播的旧磁带，一件没有收口的红毛衣。还有她的名字。',
          narration: true,
        },
        {
          text: '苏慧。',
          narration: true,
        },
        {
          text: '不是“妈”，不是谁的家属，不是报纸上缺失的那一行字。是苏慧。',
          narration: true,
        },
      ],
      prompt: '第三声钟就要响了。',
      options: [
        {
          id: 'bell',
          label: '回到井边，把车票压在毛衣下，再登车摇响三下车铃。',
          hint: '把她的名字还给井，也把自己从这趟车里摘出去。',
          next: 'c5_truth_action',
        },
        {
          id: 'run',
          label: '攥紧车票，朝槐树胡同的灯跑。',
          hint: '活着离开，但有些话将永远留在井里。',
          next: 'ending_survive',
        },
      ],
    },
    c5_gate_blind: {
      kind: 'choice',
      id: 'c5_gate_blind',
      chapter: 6,
      scene: 'return',
      place: '槐树胡同 · 第三声钟前',
      lines: [
        {
          text: '我手里只有一些零碎的印象：一件红毛衣，一段听不清的录音，一个缺角的门墩。它们拼不成一句完整的话。',
          narration: true,
        },
        {
          text: '棕衣女人还站在车门口。她看着我，不急，也不催。像母亲在院门口等孩子回家。',
          narration: true,
        },
        {
          text: '槐树胡同的灯在雾里晃。再远一点，井的方向传来第二声钟的尾音。',
          narration: true,
        },
      ],
      prompt: '第三声钟就要响了。',
      options: [
        {
          id: 'run',
          label: '捂住耳朵，朝槐树胡同的灯跑。',
          hint: '不要回头。',
          next: 'ending_survive',
        },
        {
          id: 'board',
          label: '回到车上，坐回十三排。',
          hint: '也许车会把她送回家。',
          next: 'c5_lost_action',
        },
      ],
    },
    c5_truth_action: {
      kind: 'dialogue',
      id: 'c5_truth_action',
      chapter: 6,
      scene: 'truth',
      place: '井台 · 第三声钟',
      lines: [
        {
          text: '我跑回井边。水泥盖上的孔里没有光，只有一股很冷的潮气。',
          narration: true,
        },
        {
          text: '我把旧车票放在毛衣下面，压平。然后弯腰，对着井口说：',
          narration: true,
        },
        {
          speaker: '我',
          text: '苏慧。',
        },
        {
          text: '井里安静下来。',
          narration: true,
        },
        {
          speaker: '我',
          text: '妈叫苏慧。一九九九年十一月七日，她在这口井里。她不是自己走丢的。',
        },
        {
          text: '说出这句话的时候，我听见胡同深处有很多人同时松了一口气。那些声音很轻，像一叠旧纸被风翻开。',
          narration: true,
        },
        {
          text: '我上了车。车厢里坐满了人，每一个都低着头，脸藏在阴影里。我走到驾驶座旁边，握住那根旧式的下车铃拉绳。',
          narration: true,
        },
        {
          text: '一响。',
          narration: true,
          cue: 'bell',
        },
        {
          text: '二响。',
          narration: true,
          cue: 'bell',
        },
        {
          text: '第三声钟从旧城方向传过来。我拉下第三次铃。',
          narration: true,
          cue: 'bell',
        },
        {
          speaker: '报站器',
          text: '北新桥，到了。',
        },
        {
          text: '车门打开，车灯亮起来。车里的人一个接一个起身，安静地走下去。赵长顺站在站台上，朝我抬了抬下巴，像从前在车队里跟人打招呼。',
          narration: true,
        },
        {
          text: '棕衣女人是最后一个。她走到门口，把红毛衣披在我肩上。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '袖子收好了。',
        },
        {
          text: '她下车，走进槐树胡同的灯里。背影越来越淡，最后只剩一截红线，落在地上。',
          narration: true,
        },
      ],
      next: 'ending_truth',
    },
    c5_lost_action: {
      kind: 'dialogue',
      id: 'c5_lost_action',
      chapter: 6,
      scene: 'lost-bus',
      place: '13 路末班',
      lines: [
        {
          text: '我上了车，坐回十三排。座位还是温的，像刚才有人坐过。',
          narration: true,
        },
        {
          text: '车门合上。棕衣女人坐在我旁边，把红毛衣展开，盖在我们两个人的膝盖上。',
          narration: true,
        },
        {
          speaker: '棕衣女人',
          text: '回家就好。',
        },
        {
          text: '车开动了。槐树胡同的灯从窗外经过，又经过一次，再一次。',
          narration: true,
        },
        {
          text: '我低头看自己的脚。脚上穿着一只红色的小布鞋，另一只，不知道什么时候掉了。',
          narration: true,
        },
        {
          speaker: '报站器',
          text: '下一站，井儿胡同。',
        },
      ],
      next: 'ending_lost_ride',
    },
    ending_lost_stay: {
      kind: 'ending',
      id: 'ending_lost_stay',
      chapter: 2,
      scene: 'lost-bus',
      ending: 'lost',
      lines: [
        {
          text: '我应了一声。',
          narration: true,
        },
        {
          text: '“哎。”',
          narration: true,
        },
        {
          text: '车门外那股饺子香忽然浓了。我站起来，扶着座椅往前走。赵长顺伸手想拦我，手却从我胳膊上穿了过去。',
          narration: true,
        },
        {
          text: '我走下台阶，脚落在槐树胡同的站台上。路灯在头顶亮着，灯下没有人，只有一只红色的小布鞋，端端正正摆在马路牙子上。',
          narration: true,
        },
        {
          text: '我弯腰去捡。鞋里有一张旧车票，日期是 1999 年 11 月 7 日。',
          narration: true,
        },
        {
          text: '身后车门合上。我回头，看见 13 路末班车已经开走了，车窗里坐着一个穿棕色外套的女人。她低着头，一针一针地织毛衣。',
          narration: true,
        },
        {
          text: '我沿着胡同往前走。路越来越长，路灯一盏接一盏灭掉。走到最后，槐树胡同没有出口，只有一面青灰色的砖墙。',
          narration: true,
        },
        {
          text: '墙根下有一口井。井口没有盖，里面亮着昏黄的灯。',
          narration: true,
        },
        {
          text: '“回来啦？”母亲的声音从井里传上来。',
          narration: true,
        },
        {
          text: '我蹲下去，把那只红布鞋穿在脚上。正合脚。',
          narration: true,
        },
        {
          text: '从那以后，槐树胡同多了一户人家。门牌上没有号码，门墩上刻着一个孩子的身高。每年十一月初七，那户人家会包饺子，醋香飘出半条胡同。',
          narration: true,
        },
        {
          text: '只是从来没有人见过那家的女儿。偶尔有晚归的人经过，会看见一个穿红布鞋的女人坐在门墩上，像在等谁下班回家。',
          narration: true,
        },
        {
          text: '有人问她等谁。她抬起头，很轻地说：“等我妈。她说去去就回。”',
          narration: true,
        },
        {
          text: '又过了几年，胡同要拆迁。测量队来画线，怎么也画不直这户人家的门。今天画好的红线，第二天就歪到井口那边去。',
          narration: true,
        },
        {
          text: '施工队最后绕开了那面墙。墙里那口井被重新用水泥封上，井盖上压了一块磨盘。磨盘中央凿了一个孔，夜里会透出很弱的光。',
          narration: true,
        },
        {
          text: '有一年冬天，一个收废品的老人经过。他听见墙里有收音机的声音，停下来听了很久。',
          narration: true,
        },
        {
          text: '收音机里在播天气预报，说今夜有雾，明天晴，最低气温零下一度。日期被人用指甲刮过，听不真切。',
          narration: true,
        },
        {
          text: '老人把耳朵贴在砖墙上，听见一个很轻的声音说：',
          narration: true,
        },
        {
          speaker: '我',
          text: '妈，我回来了。',
        },
        {
          text: '墙那边有人应了一声。老人吓得推着车走了。第二天他再来，砖墙还在，门墩还在，只是门牌不见了。',
          narration: true,
        },
        {
          text: '再后来，那里变成了一栋写字楼的停车场。车位编号从 01 排到 12，唯独 13 号位总是空着。',
          narration: true,
        },
        {
          text: '夜班保安说，每到深夜，13 号车位会停进一辆没有开灯的公交车。车上坐着一个穿红布鞋的女人，正低头织一件永远织不完的红毛衣。',
          narration: true,
        },
        {
          text: '他不信这些。可他从来不把车停进 13 号位。',
          narration: true,
        },
        {
          text: '有一年公司年会，停车场满了。经理非要他把 13 号位腾出来。他站在车位前，闻见一股很淡的醋味，还有刚出锅的面香。',
          narration: true,
        },
        {
          text: '他最后没停。第二天，13 号位的水泥地上多了一双小脚印，鞋底纹路里嵌着干了的红泥。',
          narration: true,
        },
        {
          text: '保洁拖了三遍，拖不干净。',
          narration: true,
        },
        {
          text: '那天夜里，保安在监控里看见 13 号位上停着一辆公交车。车身很旧，没有开灯，车窗里坐满了人。',
          narration: true,
        },
        {
          text: '他拿着手电下去，车不见了。地上只有一件叠好的红毛衣，袖口收着，针脚很密。',
          narration: true,
        },
        {
          text: '他把毛衣交到物业。物业又交到街道。街道查了半年，最后把毛衣放进了失物招领柜。',
          narration: true,
        },
        {
          text: '柜子编号是 13。从那以后，每到深夜，那个柜子里都会传出很轻的织毛衣声。',
          narration: true,
        },
      ],
    },
    ending_survive_bus: {
      kind: 'ending',
      id: 'ending_survive_bus',
      chapter: 2,
      scene: 'dawn',
      ending: 'survive',
      lines: [
        {
          text: '我没有回头。',
          narration: true,
        },
        {
          text: '我沿着槐树胡同的路灯跑。第一盏灯在身后灭了，第二盏也没有撑太久。我不敢看，只盯着最前面那一团黄豆大的光。',
          narration: true,
        },
        {
          text: '第三声钟响的时候，我撞开胡同口的施工围挡，摔在东四北大街的便道上。手掌蹭破了皮，血是热的。',
          narration: true,
        },
        {
          text: '我趴在地上喘了很久。回头时，身后只有一堵白墙。墙上贴着“创建文明城区”的标语，浆糊还没干。',
          narration: true,
        },
        {
          text: '天快亮了。环卫工推着车从街口过来，问我是不是喝多了。我摇头，说等末班车。',
          narration: true,
        },
        {
          text: '他看了看我身后的白墙，说：“这儿哪有什么站？拆了快二十年了。”',
          narration: true,
        },
        {
          text: '我回到家，发现外套口袋里多了一截红线。线头系着一个很笨的结，是母亲教我的那种双结。',
          narration: true,
        },
        {
          text: '我没有报警，也没有再去北新桥。我把红线缠在手腕上，照常上班、加班、错过公交。生活很快恢复了原样。',
          narration: true,
        },
        {
          text: '只是从那以后，我坐任何公交车都不敢睡觉。每次听到报站器响起，我都会先看清窗外的站牌。',
          narration: true,
        },
        {
          text: '有一年冬天，我坐夜班车经过北新桥。报站器忽然响了一声，又停了。司机拍了两下机器，说这破玩意儿又串台。',
          narration: true,
        },
        {
          text: '车窗玻璃上映出我的脸。旁边站着一个穿棕色外套的女人，正低头织一件永远织不完的红毛衣。',
          narration: true,
        },
        {
          text: '我没有回头。到站，我提前下了车。',
          narration: true,
        },
        {
          text: '后来我听说，那天晚上有个年轻人也在北新桥等末班车。他上了一辆没有开灯的 13 路，再也没下来。',
          narration: true,
        },
        {
          text: '我不知道那是不是我的错。我只知道，车还在开。',
          narration: true,
        },
        {
          text: '又过了些日子，我回了一趟姥姥留下的老房子。储物间最里面的樟木箱还在，锁扣锈死了。我拿螺丝刀撬开，里面只有几件旧衣服和一团红线。',
          narration: true,
        },
        {
          text: '红线下面压着一张公交月票。照片上的女人年轻，眼睛很亮，单位一栏写着“北新桥街道缝纫社”。',
          narration: true,
        },
        {
          text: '我把月票翻到背面，看见一行铅笔字：小满，妈去去就回。',
          narration: true,
        },
        {
          text: '字迹已经淡得快要看不见。我把它放回箱子，合上盖，在黑暗里坐了很久。',
          narration: true,
        },
        {
          text: '那天晚上，我没有坐公交。我沿着北新桥的胡同一直走，走到脚底发热。胡同里没有井，也没有那盏黄灯。',
          narration: true,
        },
        {
          text: '可我知道，只要我还记得那声“小满”，车就会在某个雾夜，从北新桥的站牌后面开出来。',
          narration: true,
        },
        {
          text: '所以我把家里的灯都换成了暖黄色。每天晚上，玄关留一盏。万一哪天她真的回来，至少能看见门在哪儿。',
          narration: true,
        },
        {
          text: '只是我再也没有叫过自己的乳名。',
          narration: true,
        },
        {
          text: '有一回，公司新来的实习生在茶水间问我，为什么工位上总摆着一只红色的小布鞋。',
          narration: true,
        },
        {
          text: '我说那是我小时候的鞋，另一只丢了。她说那你为什么不扔了这只。',
          narration: true,
        },
        {
          text: '我说那是我妈做的。她问好看吗，我说好看，就是只有一只。',
          narration: true,
        },
        {
          text: '实习生笑了笑，说另一只可能丢在某个地方，等哪天找到了，就配成一对了。',
          narration: true,
        },
        {
          text: '我点点头，没有告诉她，另一只我找了二十六年。',
          narration: true,
        },
        {
          text: '有些东西不是丢了，是留在原地等你。等到最后，你反而不敢回去拿。',
          narration: true,
        },
      ],
    },
    ending_survive: {
      kind: 'ending',
      id: 'ending_survive',
      chapter: 6,
      scene: 'dawn',
      ending: 'survive',
      lines: [
        {
          text: '我跑了。',
          narration: true,
        },
        {
          text: '槐树胡同的灯看着近，跑起来却很远。青砖在脚下打滑，风从耳边过去，像有人一直在后面追。我没有回头。',
          narration: true,
        },
        {
          text: '第三声钟响的时候，我正好冲出胡同口。身后传来车门闭合的声音，很轻，像一个人把嘴唇抿上。',
          narration: true,
        },
        {
          text: '再转身，胡同口只剩一堵新刷了白灰的施工围挡。围挡上贴着“北新桥片区环境整治”的通知，落款是今年十月。',
          narration: true,
        },
        {
          text: '天快亮了。东四北大街上有环卫车在洒水，槐树叶子贴着湿漉漉的柏油路，被车轮一遍遍碾过去。',
          narration: true,
        },
        {
          text: '我在路边坐了很久。手里攥着那张 1999 年的车票和红毛衣的袖口，票面上的“作废”被我的汗浸开了，像一小块旧伤。',
          narration: true,
        },
        {
          text: '我没有报警。我拿不出证据。井没了，胡同没了，连那个站牌也不见了。地图上搜不到“井儿胡同”，只搜到一家连锁便利店。',
          narration: true,
        },
        {
          text: '一个月后，我搬离了北新桥。新住处离地铁近，晚上不用再等末班公交。我把红毛衣放进衣柜最底层，再没打开过。',
          narration: true,
        },
        {
          text: '第二年十一月初七，我加班到很晚。手机里一个修音软件忽然自己播放了一段空白录音。',
          narration: true,
        },
        {
          speaker: '录音',
          text: '下一站，井儿胡同。',
        },
        {
          text: '我删掉了软件。删到第三遍时，屏幕黑了一下，映出我身后空荡荡的办公室。',
          narration: true,
        },
        {
          text: '门边站着一个穿棕色外套的女人。她的脸看不清。她只是抬起手，把一截红线轻轻放在我的桌上。',
          narration: true,
        },
        {
          text: '我知道自己离开了那趟车。但我也知道，有些车不会因为一个人下车就停下。',
          narration: true,
        },
        {
          text: '从此以后，每到一个陌生的公交站，我都先看清站牌，再上车。',
          narration: true,
        },
        {
          text: '可我再也没有在槐树胡同下过车。',
          narration: true,
        },
      ],
    },
    ending_lost_answer: {
      kind: 'ending',
      id: 'ending_lost_answer',
      chapter: 5,
      scene: 'lost-bus',
      ending: 'lost',
      lines: [
        {
          text: '“妈，我在。”',
          narration: true,
        },
        {
          text: '这句话出口的一瞬间，院子里所有的声音都停了。',
          narration: true,
        },
        {
          text: '井底亮起一线白光。我听见水声退开，像有人把一扇很久没打开的门从里面拉开。',
          narration: true,
        },
        {
          text: '赵长顺在后面喊我的名字。可我已经听不清了。我的名字像一件脱下来的外套，轻飘飘地脱离身体，落进了井里。',
          narration: true,
        },
        {
          text: '我低头看见自己的手。手背上有一道小时候被缝纫机扎的疤，正在慢慢变淡。',
          narration: true,
        },
        {
          text: '井里的女人不再喊我。她只是说：“回来就好。”',
          narration: true,
        },
        {
          text: '第二天早上，环卫工在井儿胡同的旧院门口捡到一只红色童鞋。鞋底绣着一个“满”字，鞋里塞着一张 1999 年的作废车票。',
          narration: true,
        },
        {
          text: '同一时间，13 路末班车在总站正常发车。监控里，司机旁边坐着一个穿棕色外套的女人，正低头织一件红毛衣。',
          narration: true,
        },
        {
          text: '没有人记得那天车上多过一个乘客。',
          narration: true,
        },
        {
          text: '只有到了夜里，她会给每一站上车的人让出一个靠窗的座位。她从不抬头，只在有人问她“这车到北新桥吗”的时候，很轻地说：',
          narration: true,
        },
        {
          speaker: '我',
          text: '到。北新桥嘛，到不了。',
        },
        {
          text: '下一年的十一月初七，一个加完班的年轻人上了车。他看见十三排靠窗坐着一个抱红毛衣的人，听见那个人低声说：',
          narration: true,
        },
        {
          speaker: '我',
          text: '别应名字。',
        },
        {
          text: '年轻人以为她在打电话。车窗外，北新桥的站牌一闪而过，像从来没有存在过。',
          narration: true,
        },
        {
          text: '他犹豫了一下，还是走向后座。经过十三排时，他看见那个抱红毛衣的人脚上穿着一只很小的红布鞋。',
          narration: true,
        },
        {
          text: '“您知道这车到哪儿吗？”他问。',
          narration: true,
        },
        {
          text: '那个人抬起头。车顶灯闪了一下，年轻人的脸在光里白了一瞬。',
          narration: true,
        },
        {
          speaker: '我',
          text: '到。北新桥嘛，到不了。',
        },
        {
          text: '第二天，公交公司接到一通投诉电话，说 13 路末班车在井儿胡同违规停靠。调度查了监控，那晚车上一共只有司机一个人。',
          narration: true,
        },
        {
          text: '井儿胡同的旧院在拆迁前被围了起来。工人在井里抽了三天水，抽上来的都是清水，没有尸骨，也没有车票。',
          narration: true,
        },
        {
          text: '只有一件东西没法解释：井台上放着一件红毛衣。袖口收好了，针脚很密，后背用白线缝了一个“满”字。',
          narration: true,
        },
        {
          text: '毛衣被当成无主物收进仓库。当天夜里，值班的人听见仓库里有织毛衣的声音。嗒，嗒，嗒，一直响到天亮。',
          narration: true,
        },
        {
          text: '从此，13 路末班车多了一条不成文的规矩：过了北新桥，无论听见谁叫名字，都别回头。',
          narration: true,
        },
        {
          text: '新来的司机不信。有一年深秋，他开着末班车经过北新桥，看见站台上站着一个女人，怀里抱着一件红毛衣。',
          narration: true,
        },
        {
          text: '女人问：“师傅，这车到北新桥吗？”',
          narration: true,
        },
        {
          text: '他想起老司机交代的话，没有回答，只把车门关紧，一路开到了终点站。',
          narration: true,
        },
        {
          text: '收车时，他在最后一排发现一只红色的小布鞋。鞋底绣着“满”字，里面塞着一张 1999 年的作废车票。',
          narration: true,
        },
        {
          text: '他把鞋交到调度室。第二天，鞋不见了。调度说，昨晚最后一班车根本没有出库，监控里只有他一个人在空车上坐了一夜。',
          narration: true,
        },
        {
          text: '他后来辞了职。再后来，有人在别的城市见过他，在公交站给人讲一个故事：深夜的末班车，穿棕衣的女人，还有一口不能应的井。',
          narration: true,
        },
        {
          text: '听故事的人总问，那个应了名字的姑娘后来怎么样了。',
          narration: true,
        },
        {
          text: '他摇摇头，说别问了。问多了，她就会在下一站等你。',
          narration: true,
        },
        {
          text: '而在那辆永远到不了北新桥的末班车上，我坐在十三排靠窗的位置，膝盖上盖着那件红毛衣。',
          narration: true,
        },
        {
          text: '每到大雾的夜里，车会在井儿胡同停一次。我下车，站在槐树底下，等一个穿棕色外套的女人。',
          narration: true,
        },
        {
          text: '她每次都说同样的话：“小满，妈去去就回。”',
          narration: true,
        },
        {
          text: '我每次都点头。然后我们一前一后上车，她织毛衣，我看窗外。车开一圈，又回到井儿胡同。',
          narration: true,
        },
        {
          text: '有一回，我问她：“妈，我们什么时候到家？”',
          narration: true,
        },
        {
          text: '她没有抬头，把红线在指间绕了一圈，说：“快了。下一站就是。”',
          narration: true,
        },
        {
          text: '我知道她在说谎。可我还是靠过去，把耳朵贴在她肩上，听她哼那支没有名字的歌。',
          narration: true,
        },
        {
          text: '车窗外，北新桥的站牌又一次亮起来。这一次，我闭上了眼睛。',
          narration: true,
        },
        {
          text: '没有人知道，井底那盏灯，其实一直亮着。',
          narration: true,
        },
      ],
    },
    ending_lost_ride: {
      kind: 'ending',
      id: 'ending_lost_ride',
      chapter: 6,
      scene: 'lost-bus',
      ending: 'lost',
      lines: [
        {
          text: '我在十三排坐了很久。车一直开，窗外的胡同像一卷被反复倒带的录像。',
          narration: true,
        },
        {
          text: '我学会了不在有人叫“小满”的时候回头。我也学会了在车门打开时，往阴影里再坐进去一点。',
          narration: true,
        },
        {
          text: '有时车上会来新的乘客。他们上车时都带着外面世界的冷气，手机屏幕亮着，耳机线垂在胸前，看起来和我从前一样。',
          narration: true,
        },
        {
          text: '赵长顺会在他们问路的时候说“到不了”。棕衣女人会把红毛衣搭在膝盖上，一针一针地织。她的袖子永远差最后一段。',
          narration: true,
        },
        {
          text: '一个下雪的夜里，一个女孩坐到我的斜前方。她抱着书包，手指冻得发白，问我：“姐姐，这车到北新桥吗？”',
          narration: true,
        },
        {
          text: '我看着她。她的眉眼有点像小时候的我，又有点像母亲。',
          narration: true,
        },
        {
          text: '我张了张嘴，想告诉她下车。可车门已经关了。车外没有站台，只有一口被雪盖住的井。',
          narration: true,
        },
        {
          text: '“到了。”我听见自己说，“别急，下一站就是。”',
          narration: true,
        },
        {
          text: '她松了一口气，冲我笑了一下。',
          narration: true,
        },
        {
          text: '我也笑了。井底很暖和，暖和得让人不想再起来。',
          narration: true,
        },
        {
          text: '又过了一年，末班车照常发车。车窗里映出很多张脸。最靠窗的那一张，已经不认识自己了。',
          narration: true,
        },
        {
          text: '车上的人越来越多。有丢了孩子的父亲，有值完夜班的护士，有刚和家里吵完架的学生。他们上车时都以为自己只是坐过了一站。',
          narration: true,
        },
        {
          text: '我学会了给他们让座，学会了在他们问“还有多久到”的时候，指着前面说“快了”。',
          narration: true,
        },
        {
          text: '只有一次，一个老太太在上车时回头看了看站台。她说：“这站怎么没有名字？”',
          narration: true,
        },
        {
          text: '我想了想，告诉她：“以前有。后来被井吃了。”',
          narration: true,
        },
        {
          text: '她哦了一声，找了个座位坐下，再也没有问。',
          narration: true,
        },
        {
          text: '车继续开。前方没有终点，后面也没有来路。每到大雾的夜里，13 路末班车都会准时经过北新桥，接走一个还没学会回头的人。',
          narration: true,
        },
        {
          text: '有一晚，一个女孩在车上哭。她说她明天还要上班，还有一只猫要喂。我把我妈织的那件红毛衣借给她披着。',
          narration: true,
        },
        {
          text: '她问我：“姐姐，你不想下车吗？”',
          narration: true,
        },
        {
          text: '我想了很久。车窗外的北新桥站牌从雾里升起来，又落下去。',
          narration: true,
        },
        {
          text: '“下过。”我说，“没下去。”',
          narration: true,
        },
        {
          text: '女孩把红毛衣还给我。毛衣上多了一根长头发，不是我的。我把头发绕在手指上，绕了三圈，正好是一个戒指的粗细。',
          narration: true,
        },
        {
          text: '后来，十三路末班车换了新车。报站器是电子女声，座椅是硬塑料，车窗上贴着扫码乘车的提示。可到了十一月初七，它还是会从终点站后头多开出一班。',
          narration: true,
        },
        {
          text: '新车里没有售票员，只有我。我坐在十三排，替每一个上车的乘客看着站牌。有人低头玩手机，有人靠着窗睡觉，有人偷偷抹眼泪。',
          narration: true,
        },
        {
          text: '我想起母亲说的那句话：坐车不能睡，睡了会坐过站。可这辆车没有站。它只有一圈又一圈，像井壁上的螺纹。',
          narration: true,
        },
        {
          text: '每到第三声钟响，我都会朝车门看一眼。偶尔会有一个穿棕色外套的女人站在站台上，朝我摆摆手，像在说：别下来。',
          narration: true,
        },
      ],
    },
    ending_truth: {
      kind: 'ending',
      id: 'ending_truth',
      chapter: 6,
      scene: 'truth',
      ending: 'truth',
      lines: [
        {
          text: '车开走的时候，天边已经泛白。',
          narration: true,
        },
        {
          text: '槐树胡同的灯灭了。施工围挡后面，老院子的轮廓像一张被水洗过的画，慢慢褪进晨雾里。',
          narration: true,
        },
        {
          text: '我站在北新桥路口，肩上披着那件红毛衣。车票不见了，收音机也不见了。手里只剩一截红线，系在我的小指上。',
          narration: true,
        },
        {
          text: '我去了派出所。值班民警很年轻，听我说完，表情像在听一个熬了夜的梦。可当我报出“苏慧”和“井儿胡同”的时候，他敲键盘的手停了。',
          narration: true,
        },
        {
          text: '系统里有一条很旧的记录：1999 年 11 月 7 日，北新桥街道井儿胡同，路面塌陷。无人员伤亡。',
          narration: true,
        },
        {
          text: '“无人员伤亡”后面，被人用铅笔补过一个小小的问号。铅笔印很浅，像是不敢留下名字的人写的。',
          narration: true,
        },
        {
          text: '三个月后，区档案馆补录了一份事故说明。13 路末班车，临时改行井儿胡同；乘客苏慧，三十四岁，为救落井儿童返回车厢，井壁坍塌，不幸遇难。',
          narration: true,
        },
        {
          text: '没有新闻，没有追责大会。只是公交站牌后面多了一块很小的铜牌，上面刻着她的名字。铜牌下方，有人放了一只红色的小布鞋。',
          narration: true,
        },
        {
          text: '赵长顺在第二年春天去世。葬礼上没有人提那趟末班车。他的遗物里有一盘旧磁带，标签上写着：井儿胡同，1999.11.7。',
          narration: true,
        },
        {
          text: '我把磁带带回家，却始终没有放。',
          narration: true,
        },
        {
          text: '不是不敢。是因为我已经想不起母亲的声音了。',
          narration: true,
        },
        {
          text: '我记得她叫苏慧，记得她三十四岁，记得她织过一件没有收口的红毛衣。可当我闭上眼睛，她的脸只剩下一团很暖的棕色，和一根缠在手指上的红线。',
          narration: true,
        },
        {
          text: '井要的不是名字，是一个愿意一直替它记住的人。我把名字还给了它，也把母亲从自己的记忆里还给了她。',
          narration: true,
        },
        {
          text: '有时我会想，这算不算另一种失去。可每到十一月初七，我都会去北新桥。站牌后面的铜牌被擦得很亮，没有末班车，也没有穿棕色外套的女人。',
          narration: true,
        },
        {
          text: '胡同里有人在做饭，收音机播着很老的评书。槐树底下，一个小孩蹲在门墩旁，用石子在地上划身高线。',
          narration: true,
        },
        {
          text: '我从小指上解下那截红线，系在铜牌旁边。',
          narration: true,
        },
        {
          speaker: '我',
          text: '苏慧。',
        },
        {
          text: '这一次，我听见风从胡同里穿过去。很干净，像什么都没有留下。',
          narration: true,
        },
      ],
    },
  },
}

export default story
