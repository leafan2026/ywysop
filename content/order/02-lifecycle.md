---
id: "lifecycle"
title: "订单生命周期"
sort: 20
status: "published"
---
<h2>订单生命周期</h2>
        <p>下图展示主线 8 个阶段。售后分支与主线并行，订单在任意阶段都可进入售后再回流到对应状态。</p>

        <div class="flow-canvas flow-canvas--wide">
          <div class="flow">
            <span class="step step--stack">
              <span>线上 · 金数据</span>
              <span class="step-sub">webhook 推送</span>
            </span>
            <span class="line line--short line--noarrow"></span>
            <span class="step step--stack">
              <span>线下批量导入</span>
              <span class="step-sub">学校订购</span>
            </span>
            <span class="line line--short line--noarrow"></span>
            <span class="step step--stack">
              <span>客服补单</span>
              <span class="step-sub">零散付款</span>
            </span>
            <span class="line"></span>

            <span class="step step--terminal">订单创建</span>
            <span class="line"></span>
            <a href="#review" class="step step--link">① 订单审核</a>
            <span class="line"></span>
            <a href="#inventory" class="step step--link">② 库存判定</a>
            <span class="line"></span>
            <a href="#purchase" class="step step--link">③ 采购前后判定</a>
            <span class="line"></span>
            <span class="step step--output">锁库存 · 汇合</span>
            <span class="line"></span>
            <span class="step">④ 仓库二次复核</span>
            <span class="line"></span>
            <a href="#prep" class="step step--link">⑤ 合单 / 配货</a>
            <span class="line"></span>
            <a href="#ship" class="step step--link">⑥ 拣货出库</a>
            <span class="line"></span>
            <span class="step step--terminal">已出库</span>
          </div>
        </div>

        <h3>并行的售后三分支</h3>
        <p>每个分支对应主线的某个状态切片：</p>
        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--decision">售后申请</span>
            <div class="paths">
              <div class="path">
                <span class="path-tag path-tag--wide">未出库</span>
                <span class="line"></span>
                <a href="#pre-ship" class="step step--link">发货前退换货</a>
                <span class="line line--noarrow line--short"></span>
                <span class="step step--muted">调货前 / 调货后</span>
              </div>
              <div class="path">
                <span class="path-tag path-tag--wide">已出库</span>
                <span class="line"></span>
                <a href="#post-ship" class="step step--link">线上发货后退换货</a>
                <span class="line line--noarrow line--short"></span>
                <span class="step step--muted">内部 / 家长 → 回仓判定</span>
              </div>
              <div class="path">
                <span class="path-tag path-tag--wide">在校现场</span>
                <span class="line"></span>
                <a href="#offline" class="step step--link">线下换货</a>
                <span class="line line--noarrow line--short"></span>
                <span class="step step--muted">收发一体化</span>
              </div>
            </div>
          </div>
        </div>
