---
id: "overview"
title: "整体流程"
sort: 10
status: "published"
---
<h2>整体流程</h2>
        <p>退换货工单的外部可观察步骤有四步：填写申请、管家审批、业务审批、工单结束。</p>
        <p>业务审批通过的那一刻，按订单当前阶段走以下三条路径之一。</p>

        <div class="flow-canvas">
          <div class="flow">
            <span class="step step--terminal">填写申请</span>
            <span class="line"></span>
            <span class="step">管家二次联系审批</span>
            <span class="line"></span>
            <span class="step step--decision">业务审批</span>

            <div class="branches">
              <div class="branch">
                <span class="branch-label">不通过</span>
                <span class="line line--long"></span>
              </div>
              <div class="branch">
                <span class="branch-label">通过</span>
                <span class="line"></span>
                <span class="step step--decision">阶段</span>
                <span class="line line--short"></span>
                <div class="branches">
                  <div class="branch"><a href="#before" class="step step--link">调货前</a></div>
                  <div class="branch"><a href="#after" class="step step--link">调货后</a></div>
                  <div class="branch"><a href="#shipped" class="step step--link">发货后</a></div>
                </div>
              </div>
            </div>

            <span class="merge merge--tall"></span>
            <span class="step step--terminal">工单结束</span>
          </div>
        </div>
